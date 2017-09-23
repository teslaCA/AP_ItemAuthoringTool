import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {ItemBraille} from "../../../services/item.service/models/shared/item-braille";
import {FormBuilder} from "@angular/forms";
import {Logger} from "../../../../core/logger.service/logger.service";
import {FileItem, FileUploader, ParsedResponseHeaders} from "ng2-file-upload";
import {ItemAttachment} from "../../../services/item.service/models/shared/item-attachment";
import {ItemService} from "../../../services/item.service/item.service";
import {AlertService} from "../../../../core/alert.service/alert.service";
import {ModalDirective} from "ngx-bootstrap";
import {BusyService} from "../../../../core/busy.service/busy.service";
import {ItemContext} from "../../../services/item.service/models/base/item-context";

@Component({
  selector: 'item-braille-tab',
  templateUrl: './item-braille-tab.component.html',
  styleUrls: ['./item-braille-tab.component.less'],
})
export class ItemBrailleTabComponent implements OnInit, OnChanges {
  serviceUrl = '/api/ims/v1/items';
  uploader: FileUploader;
  hasDropZoneOver = false;
  deleteIndex = -1;
  deleteFileName = '';
  brailleAttachments: ItemAttachment[];
  @ViewChild('fileDialog') fileDialog: ElementRef;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @Input() isReadOnly: boolean;
  @Input() itemContext: ItemContext;
  @Output() itemBrailleChanged = new EventEmitter<ItemBraille>();
  readonly fieldForm = this.fb.group({
    brailleRequired: '',
    isBrailleProvided: '',
  });

  get currentItemBraille(): ItemBraille {
    const braille = new ItemBraille();
    braille.brailleRequired = this.fieldForm.value.brailleRequired;
    braille.isBrailleProvided = this.fieldForm.value.isBrailleProvided;
    return braille;
  }

  constructor(private fb: FormBuilder,
              private logger: Logger,
              private itemService: ItemService,
              private alertService: AlertService,
              private busyService: BusyService) {
  }

  ngOnInit() {
    // Reset form data and flags
    this.brailleAttachments = this.itemContext.item.braille.attachments;

    // Configure uploader component
    let itemFileUrl = "";
    if (!this.isReadOnly) {
      itemFileUrl = `${this.serviceUrl}/${this.itemContext.item.id}/files/braille`;
    }
    this.uploader = new FileUploader({url: itemFileUrl});
    this.uploader.setOptions({autoUpload: true});

    // Overwrite uploader functions
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      this.logger.info('Successfully uploaded: ' + item.file.name);

      const responseDate = this.getCurrentUTCDate();

      // Check if file was overwritten
      const existingFile = this.brailleAttachments.filter(file => file.fileName === item.file.name);
      if (existingFile.length > 0) {
        // Only change the modified date
        existingFile[0].uploadedDate = responseDate;
      }
      else {
        // Add new file entry
        const file = new ItemAttachment();
        file.fileName = item.file.name;
        file.uploadedDate = responseDate;
        this.brailleAttachments.push(file);
      }
    };

    // Display error message
    this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      console.log('onErrorItem status: ' + status);
      this.alertService.error('Error Uploading File',
        'File ' + item.file.name + ' was not uploaded. ' + response);
    };

    // Turn on busy service
    this.uploader.onBeforeUploadItem = (fileitem: FileItem) => {
      this.busyService.show('Uploading ' + fileitem.file.name);
    };

    // Clear queue and hide busy service
    this.uploader.onCompleteAll = () => {
      //this.updateFileList();
      this.uploader.clearQueue();
      this.busyService.hide();
    };
  }

  ngOnChanges() {
    // Reset form data and flags
    this.fieldForm.reset({
      brailleRequired: this.itemContext.item.braille.brailleRequired,
      isBrailleProvided: this.itemContext.item.braille.isBrailleProvided
    });

    // Disable form if read-only
    if (this.isReadOnly) {
      this.fieldForm.disable();
    }

    // Fire event on changes
    this.fieldForm.valueChanges.subscribe(
      () => {
        this.logger.debug(`Updating Braille flags to 
        Requires Braille: '${this.fieldForm.value.brailleRequired}'
        Braille Content Provided: '${this.fieldForm.value.brailleProvided}'
        `);

        this.itemBrailleChanged.emit(this.currentItemBraille);
      });
  }

  fileOverBase(e: any): void {
    this.hasDropZoneOver = e;
  }

  openFileDialog() {
    this.fileDialog.nativeElement.click();
  }

  confirmDeleteFile(index: number, fileName: string): void {
    this.deleteIndex = index;
    this.deleteFileName = fileName;
    this.deleteModal.show();
  }

  deleteFile(index: number, fileName: string): void {
    this.itemService
      .deleteBrailleFile(this.itemContext.item.id, fileName, true, true)
      .subscribe(() => {
          this.brailleAttachments.splice(index, 1);

          this.alertService.success('Attachment Deleted',
            'Braille file ' + fileName + ' was successfully deleted');
        }
      );
    this.deleteFileName = "";
    this.deleteModal.hide();
  }

  private getCurrentUTCDate(): string {
    const utcString = new Date(Date.now()).toUTCString();
    return new Date(utcString).toISOString();
  }
}

import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Logger} from "../../../../core/logger.service/logger.service";
import {FileItem, FileUploader, ParsedResponseHeaders} from "ng2-file-upload";
import {ItemAttachment} from "../../../services/item.service/models/shared/item-attachment";
import {ItemService} from "../../../services/item.service/item.service";
import {AlertService} from "../../../../core/alert.service/alert.service";
import {ModalDirective} from "ngx-bootstrap";
import {BusyService} from "../../../../core/busy.service/busy.service";
import {ItemContext} from "../../../services/item.service/models/base/item-context";
import {ItemCc} from "../../../services/item.service/models/shared/item-cc";

@Component({
  selector: 'item-cc-tab',
  templateUrl: './item-cc-tab.component.html',
  styleUrls: ['./item-cc-tab.component.less'],
})
export class ItemCcTabComponent implements OnInit, OnChanges {
  serviceUrl = '/api/ims/v1/items';
  uploader: FileUploader;
  hasDropZoneOver = false;
  deleteIndex = -1;
  deleteFileName = "";
  ccAttachments: ItemAttachment[];
  @ViewChild("fileDialog") fileDialog: ElementRef;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @Input() isReadOnly: boolean;
  @Input() itemContext: ItemContext;
  @Output() itemCcChanged = new EventEmitter<ItemCc>();
  readonly fieldForm = this.fb.group({
    ccRequired: '',
    isCcProvided: ''
  });

  get currentItemCc(): ItemCc {
    const cc = new ItemCc();
    cc.ccRequired = this.fieldForm.value.ccRequired;
    cc.isCcProvided = this.fieldForm.value.isCcProvided;
    return cc;
  }

  constructor(private fb: FormBuilder,
              private logger: Logger,
              private itemService: ItemService,
              private alertService: AlertService,
              private busyService: BusyService) {
  }

  ngOnInit() {
    // Reset form data and flags
    this.ccAttachments = this.itemContext.item.cc.attachments;

    // Configure uploader component
    let itemFileUrl = "";
    if (!this.isReadOnly) {
      itemFileUrl = `${this.serviceUrl}/${this.itemContext.item.id}/files/cc`;
    }
    this.uploader = new FileUploader({url: itemFileUrl});
    this.uploader.setOptions({autoUpload: true});

    // Overwrite uploader functions
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      this.logger.info('Successfully uploaded: ' + item.file.name);

      const responseDate = this.getCurrentUTCDate();

      // Check if file was overwritten
      const existingFile = this.ccAttachments.filter(file => file.fileName === item.file.name);
      if (existingFile.length > 0) {
        // Only change the modified date
        existingFile[0].uploadedDate = responseDate;
      }
      else {
        // Add new file entry
        const file = new ItemAttachment();
        file.fileName = item.file.name;
        file.uploadedDate = responseDate;
        this.ccAttachments.push(file);
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
      ccRequired: this.itemContext.item.cc.ccRequired,
      isCcProvided: this.itemContext.item.cc.isCcProvided
    });

    // Disable form if read-only
    if (this.isReadOnly) {
      this.fieldForm.disable();
    }

    // Fire event on changes
    this.fieldForm.valueChanges.subscribe(
        () => {
          this.logger.debug(`Updating CC flags to 
        Requires CC: '${this.fieldForm.value.isCcRequired}'
        CC Content Provided: '${this.fieldForm.value.isCcProvided}'
        `);

          this.itemCcChanged.emit(this.currentItemCc);
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
        .deleteCcFile(this.itemContext.item.id, fileName, true, true)
        .subscribe(() => {
              this.ccAttachments.splice(index, 1);

              this.alertService.success('Attachment Deleted',
                  'CC file ' + fileName + ' was successfully deleted');
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

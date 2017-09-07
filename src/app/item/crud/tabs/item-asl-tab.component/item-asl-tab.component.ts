import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {ItemAsl} from "../../../services/item.service/item-asl";
import {FormBuilder} from "@angular/forms";
import {Logger} from "../../../../core/logger.service/logger.service";
import {FileItem, FileUploader, ParsedResponseHeaders} from "ng2-file-upload";
import {Item} from "../../../services/item.service/item";
import {ItemAttachment} from "../../../services/item.service/item-attachment";
import {ItemService} from "../../../services/item.service/item.service";
import {AlertService} from "../../../../core/alert.service/alert.service";
import {ModalDirective} from "ngx-bootstrap";
import {BusyService} from "../../../../core/busy.service/busy.service";

@Component({
  selector: 'item-asl-tab',
  templateUrl: './item-asl-tab.component.html',
  styleUrls: ['./item-asl-tab.component.less'],
})
export class ItemAslTabComponent implements OnInit, OnChanges {
  serviceUrl = '/api/ims/v1/items';
  uploader: FileUploader;
  hasDropZoneOver = false;
  deleteIndex = -1;
  deleteFileName = "";
  aslAttachments: ItemAttachment[];
  @ViewChild("fileDialog") fileDialog: ElementRef;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @Input() isReadOnly: boolean;
  @Input() item: Item;
  @Output() itemAslChanged = new EventEmitter<ItemAsl>();
  readonly fieldForm = this.fb.group({
    isAslRequired: '',
    isAslProvided: ''
  });

  get currentItemAsl(): ItemAsl {
    const asl = new ItemAsl();
    asl.isAslRequired = this.fieldForm.value.isAslRequired;
    asl.isAslProvided = this.fieldForm.value.isAslProvided;
    return asl;
  }

  constructor(private fb: FormBuilder,
              private logger: Logger,
              private itemService: ItemService,
              private alertService: AlertService,
              private busyService: BusyService) {
  }

  ngOnInit() {
    // Reset form data and flags
    this.aslAttachments = this.item.asl.attachments;

    // Configure uploader component
    let itemFileUrl = "";
    if (!this.isReadOnly) {
      itemFileUrl = this.serviceUrl + '/'
        + this.item.id + '/transactions/'
        + this.item.currentTransaction.transactionId + '/asl';
    }
    this.uploader = new FileUploader({url: itemFileUrl});
    this.uploader.setOptions({autoUpload: true});

    // Overwrite uploader functions
    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      this.logger.info('Successfully uploaded: ' + item.file.name);

      const responseDate = this.getCurrentUTCDate();

      // Check if file was overwritten
      const existingFile = this.aslAttachments.filter(file => file.fileName === item.file.name);
      if (existingFile.length > 0) {
        // Only change the modified date
        existingFile[0].uploadedDate = responseDate;
      }
      else {
        // Add new file entry
        const file = new ItemAttachment();
        file.fileName = item.file.name;
        file.uploadedDate = responseDate;
        this.aslAttachments.push(file);
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
      isAslRequired: this.item.asl.isAslRequired,
      isAslProvided: this.item.asl.isAslProvided
    });

    // Disable form if read-only
    if (this.isReadOnly) {
      this.fieldForm.disable();
    }

    // Fire event on changes
    this.fieldForm.valueChanges.subscribe(
      () => {
        this.logger.debug(`Updating ASL flags to 
        Requires ASL: '${this.fieldForm.value.isAslRequired}'
        ASL Content Provided: '${this.fieldForm.value.isAslProvided}'
        `);

        this.itemAslChanged.emit(this.currentItemAsl);
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
      .deleteAslFile(
        this.item.currentTransaction.transactionId,
        this.item.id,
        fileName, true, true)
      .subscribe(() => {
          this.aslAttachments.splice(index, 1);

          this.alertService.success('Attachment Deleted',
            'ASL file ' + fileName + ' was successfully deleted');
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

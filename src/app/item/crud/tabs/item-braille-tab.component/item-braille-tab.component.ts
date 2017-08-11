import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {ItemBraille} from "../../../services/item.service/item-braille";
import {FormBuilder} from "@angular/forms";
import {Logger} from "../../../../core/logger.service/logger.service";
import {FileItem, FileUploader, ParsedResponseHeaders} from "ng2-file-upload";
import {Item} from "../../../services/item.service/item";
import {ItemAttachment} from "../../../services/item.service/item-attachment";
import {ItemService} from "../../../services/item.service/item.service";
import {AlertService} from "../../../../core/alert.service/alert.service";
import {ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'item-braille-tab',
  templateUrl: './item-braille-tab.component.html',
  styleUrls: ['./item-braille-tab.component.less'],
})
export class ItemBrailleTabComponent implements OnInit, OnChanges {
  serviceUrl = '/api/ims/v1/items';
  uploader: FileUploader;
  hasDropZoneOver = false;
  brailleAttachments: ItemAttachment[];
  deleteFileName = "";
  @ViewChild("fileDialog") fileDialog: ElementRef;
  @ViewChild('deleteModal') deleteModal: ModalDirective;
  @Input() isReadOnly: boolean;
  @Input() item: Item;
  @Output() itemBrailleChanged = new EventEmitter<ItemBraille>();
  readonly form = this.formBuilder.group({
    isBrailleRequired: '',
    isBrailleProvided: ''
  });

  get currentItemBraille(): ItemBraille {
    const braille = new ItemBraille();
    braille.isBrailleRequired = this.form.value.isBrailleRequired;
    braille.isBrailleProvided = this.form.value.isBrailleProvided;
    return braille;
  }

  constructor(private formBuilder: FormBuilder,
              private logger: Logger,
              private itemService: ItemService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    const itemFileUrl = this.serviceUrl + '/'
      + this.item.id + '/transactions/'
      + this.item.currentTransaction.transactionId + '/braille';
    this.uploader = new FileUploader({url: itemFileUrl});
    this.uploader.setOptions({autoUpload: true});

    this.brailleAttachments = this.item.braille.attachments;

    this.uploader.onCompleteAll = () => {
      this.updateFileList();
      this.uploader.clearQueue();
    };

    this.uploader.onErrorItem = (item:FileItem, response:string, status:number, headers:ParsedResponseHeaders) => {
      this.alertService.error('Error Uploading File',
        'File ' + item.file.name + ' was not uploaded. Reason: ' + response);
    };

  }

  ngOnChanges() {
    // Reset form data and flags
    this.form.reset({
      isBrailleRequired: this.item.braille.isBrailleRequired,
      isBrailleProvided: this.item.braille.isBrailleProvided
    });

    // Disable form if read-only
    if (this.isReadOnly) {
      this.form.disable();
    }

    // Fire event on changes
    this.form.valueChanges.subscribe(
      () => {
        this.logger.debug(`Updating Braille flags to 
        Requires Braille: '${this.form.value.isBrailleRequired}'
        Braille Content Provided: '${this.form.value.isBrailleProvided}'
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

  confirmDeleteFile(fileName: string): void {
    this.deleteFileName = fileName;
    this.deleteModal.show();
  }

  deleteFile(fileName: string): void {
    this.itemService
      .deleteBrailleFile(this.item.currentTransaction.transactionId,
        this.item.id,
        fileName, true, true)
      .subscribe(() => {
          this.updateFileList();
          this.alertService.success('Attachment Deleted',
            'Braille file ' + fileName + ' was successfully deleted');
        }
      );
    this.deleteFileName = "";
    this.deleteModal.hide();
  }

  updateFileList() {
    this.itemService.findItem(this.item.id, false, true)
      .subscribe(
        item => {
          this.brailleAttachments = item.braille.attachments;
        },
        () => {
          this.alertService.error('Error loading item',
            'Error Loading item ' + this.item.id);
        });
  }

}

import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {ItemBraille} from "../../../services/item.service/item-braille";
import {FormBuilder} from "@angular/forms";
import {Logger} from "../../../../core/logger.service/logger.service";
import {FileUploader} from "ng2-file-upload";
import {Item} from "../../../services/item.service/item";

@Component({
  selector: 'item-braille-tab',
  templateUrl: './item-braille-tab.component.html',
  styleUrls: ['./item-braille-tab.component.less'],
})
export class ItemBrailleTabComponent implements OnInit, OnChanges {
  serviceUrl = '/api/ims/v1/items';
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  @ViewChild("fileDialog") fileDialog: ElementRef;
  @Input() isReadOnly: boolean;
  @Input() item: Item;
  @Output() itemBrailleChanged = new EventEmitter<ItemBraille>();
  readonly form = this.formBuilder.group({
    isBrailleRequired: '',
    isBrailleContentProvided: ''
  });

  get currentItemBraille(): ItemBraille {
    const braille = new ItemBraille();
    braille.isBrailleRequired = this.form.value.isBrailleRequired;
    braille.isBrailleContentProvided = this.form.value.isBrailleContentProvided;
    return braille;
  }

  constructor(private formBuilder: FormBuilder,
              private logger: Logger) { }

  ngOnInit() {
    this.uploader = new FileUploader({url: this.serviceUrl +'/'
      + this.item.id + '/transactions/'
      + this.item.currentTransaction.transactionId + '/braille'});

    this.uploader.setOptions({autoUpload: true});
  }


  ngOnChanges() {
    // Reset form data and flags
    this.form.reset({
      isBrailleRequired: this.item.braille.isBrailleRequired,
      isBrailleContentProvided: this.item.braille.isBrailleContentProvided
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
        Braille Content Provided: '${this.form.value.isBrailleContentProvided}'
        `);

        this.itemBrailleChanged.emit(this.currentItemBraille);
      });
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  openFileDialog() {
    this.fileDialog.nativeElement.click();
  }

  upload() {
    console.log('queue length:' + this.uploader.queue.length)
    this.uploader.uploadAll();
  }
}

import {AfterViewChecked, Component, ElementRef, Input, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Logger} from "../../core/logger.service";
import {Item} from "../model/item/item";
import {SaItem} from "../model/item/sa-item";

@Component({
  selector: 'app-item-load-sa',
  templateUrl: './item-load-sa.component.html',
  styleUrls: ['./item-load-sa.component.less']
})
export class ItemLoadSaComponent implements OnInit, AfterViewChecked {
  //---------------------------------------------------------------------------
  // Stem fields
  // TODO: Move to separate component
  //---------------------------------------------------------------------------
  stemForm: FormGroup;

  get itemStem(): string {
    if (this.item) {
      return this.item.prompt;
    } else {
      return '';
    }
  }

  //---------------------------------------------------------------------------
  // Exemplar responses fields
  // TODO: Move to separate component
  //---------------------------------------------------------------------------
  private responseAdded = false;
  responseForm: FormGroup;
  deleteResponseIndex: number;

  get responses(): FormArray {
    return this.responseForm.get('responses') as FormArray;
  };

  //---------------------------------------------------------------------------
  // General responses fields
  //---------------------------------------------------------------------------
  @Input() item: SaItem;
  @Input() isView: boolean;

  //---------------------------------------------------------------------------
  // Stem methods
  // TODO: Move to separate component
  //---------------------------------------------------------------------------
  private initializeStemForm() {
    this.stemForm = this.fb.group({
      promptStem: ''
    });
  }

  private copyStemFromFormIntoItem(): void {
    this.item.prompt = this.stemForm.get('promptStem').value;
  }

  //---------------------------------------------------------------------------
  // Exemplar responses methods
  // TODO: Move to separate component
  //---------------------------------------------------------------------------
  ngAfterViewChecked() {
    this.setFocusOnNewlyAddedResponse();
  }

  addResponse(value: string): void {
    this.responses.push(this.fb.group({samplecontent: value}));
    this.responseAdded = true;
  }

  removeResponse(): void {
    if (this.deleteResponseIndex !== -1) {
      this.responses.removeAt(this.deleteResponseIndex);
      this.deleteResponseIndex = -1;
    }
  }

  private setFocusOnNewlyAddedResponse(): void {
    // Implemented AfterViewChecked lifecycle hook since DOM is not rendered when the new response object is created in addResponse()
    // Added a local flag to only attempt to set focus when a new response has been added
    if (this.responseAdded) {
      const lastRespId = this.responses.length - 1;
      this.logger.debug('Focusing last Response' + lastRespId);
      const lastResp = this.element.nativeElement.querySelector('#samplecontent-' + lastRespId);
      if (undefined !== lastResp && lastResp.valueOf() !== '') {
        lastResp.focus();
      }
      this.responseAdded = false;
    }
  }

  private initializeExemplarResponsesForm(): void {
    this.responseForm = this.fb.group({
      responses: this.fb.array([])
    });
  }

  private copyExemplarResponsesFromItemToForm(): void {
    if (this.item) {
      for (const response of this.item.exemplarResponses) {
        this.addResponse(response);
      }
    }
  }

  private copyExemplarResponsesFromFormToItem() {
    this.item.exemplarResponses = [];
    for (let i = 0; i < this.responses.length; ++i) {
      this.item.exemplarResponses.push(this.responses.at(i).get('samplecontent').value);
    }
  }

  //---------------------------------------------------------------------------
  // General methods
  //---------------------------------------------------------------------------
  constructor(private logger: Logger,
              private fb: FormBuilder,
              private element: ElementRef) {
    this.initializeStemForm();
    this.initializeExemplarResponsesForm();
  }

  ngOnInit() {
    this.copyExemplarResponsesFromItemToForm();

    // Disable the form if we're in "view" mode
    this.logger.debug('isView: ' + this.isView);
    if (this.isView) {
      this.stemForm.disable();
      this.responseForm.disable();
    }
  }

  public currentItem(): Item {
    this.copyStemFromFormIntoItem();
    this.copyExemplarResponsesFromFormToItem();

    return this.item;
  }
}

import {
  AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit,
  Output
} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Logger} from "../../../../core/logger.service/logger.service";
import {Item} from "../../../services/item.service/item";
import {SaItem} from "../../../services/item.service/sa-item";

// TODO: Refactor WER item component and SA item component to share common code, template, etc.
@Component({
  selector: 'sa-item',
  templateUrl: './sa-item.component.html',
  styleUrls: ['./sa-item.component.less']
})
export class SaItemComponent implements OnInit, AfterViewChecked, AfterViewInit {
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
  // General fields
  //---------------------------------------------------------------------------
  @Input() item: SaItem;
  @Input() isView: boolean;
  @Output() itemChanged = new EventEmitter<Item>();

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
    if (this.isView) {
      this.stemForm.disable();
      this.responseForm.disable();
    }
  }

  ngAfterViewInit() {
    // Wire up changes to the stem form to trigger an auto-save
    this.stemForm.valueChanges.subscribe(
      () => {
        this.itemChanged.emit(this.currentItem());
      });

    // Wire up changes to the exemplar responses form to trigger an auto-save
    this.responseForm.valueChanges.subscribe(
      () => {
        this.itemChanged.emit(this.currentItem());
      });
  }

  // TODO: Current item should be clone of input item plus changes in form.  @Input fields should be immutable.
  public currentItem(): Item {
    this.copyStemFromFormIntoItem();
    this.copyExemplarResponsesFromFormToItem();

    return this.item;
  }
}

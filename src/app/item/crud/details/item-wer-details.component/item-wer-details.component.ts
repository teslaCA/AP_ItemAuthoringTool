import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Item} from "../../../services/item.service/item";
import {WerItem} from "../../../services/item.service/wer-item";
import {ItemPromptComponent} from "../shared/item-prompt.component/item-prompt.component";

// TODO: Refactor WER item component and SA item component to share common code, template, etc.
@Component({
  selector: 'item-wer-details',
  templateUrl: './item-wer-details.component.html',
  styleUrls: ['./item-wer-details.component.less']
})
export class ItemWerDetailsComponent implements OnInit, AfterViewChecked, AfterViewInit {
  @Input() item: WerItem;
  @Input() isReadOnly: boolean;
  @Output() itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemPromptComponent) itemPromptComponent;
  private responseAdded = false;
  responseForm: FormGroup;
  deleteResponseIndex: number;

  get responses(): FormArray {
    return this.responseForm.get('responses') as FormArray;
  };

  constructor(private fb: FormBuilder,
              private element: ElementRef) {
    this.initializeExemplarResponsesForm();
  }

  ngOnInit() {
    this.copyExemplarResponsesFromItemToForm();

    // Disable the form if we're in "view" mode
    if (this.isReadOnly) {
      this.responseForm.disable();
    }
  }

  ngAfterViewInit() {
    // Wire up changes to the exemplar responses form to trigger an auto-save
    this.responseForm.valueChanges.subscribe(
      () => {
        this.itemChanged.emit(this.currentItem());
      });
  }

  ngAfterViewChecked() {
    this.setFocusOnNewlyAddedResponse();
  }

  // TODO: Change to getter
  // TODO: Current item should be clone of input item plus changes in form.  @Input fields should be immutable.
  public currentItem(): Item {
    this.copyPromptFromFormIntoItem();
    this.copyExemplarResponsesFromFormToItem();

    return this.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem());
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

  private copyPromptFromFormIntoItem(): void {
    this.item.prompt = this.itemPromptComponent.currentText;
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
}

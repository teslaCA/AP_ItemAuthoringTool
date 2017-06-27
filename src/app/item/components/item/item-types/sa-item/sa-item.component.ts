import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import {FormArray, FormBuilder} from "@angular/forms";
import {Item} from "../../../../services/item/item";
import {SaItem} from "../../../../services/item/sa-item";
import {PromptComponent} from "../../shared/prompt/prompt.component";

// TODO: Refactor WER item component and SA item component to share common code, template, etc.
@Component({
  selector: 'sa-item',
  templateUrl: './sa-item.component.html',
  styleUrls: ['./sa-item.component.less']
})
export class SaItemComponent implements OnInit, OnChanges, AfterViewChecked, AfterViewInit {
  responseForm = this.formBuilder.group({
    responses: this.formBuilder.array([])
  });
  responseAdded = false;
  deleteResponseIndex: number;
  @Input() item: SaItem;
  @Input() isView: boolean;
  @Output() itemChanged = new EventEmitter<Item>();

  @ViewChild(PromptComponent) promptComponent;

  get responses(): FormArray {
    return this.responseForm.get('responses') as FormArray;
  };

  currentItem(): Item {
    this.copyPromptFromFormIntoItem();
    this.copyExemplarResponsesFromFormToItem();

    return this.item;
  }

  constructor(private formBuilder: FormBuilder,
              private element: ElementRef) {
  }

  ngOnInit() {
    // Disable the form if we're in "view" mode
    if (this.isView) {
      this.responseForm.disable();
    }
  }

  ngOnChanges() {
    // Copy model to form
    this.copyExemplarResponsesFromItemToForm();
  }

  ngAfterViewChecked() {
    this.setFocusOnNewlyAddedResponse();
  }

  ngAfterViewInit() {
    // Wire up changes to the exemplar responses form to trigger an auto-save
    this.responseForm.valueChanges.subscribe(
      () => {
        this.itemChanged.emit(this.currentItem());
      });
  }

  onPromptChanged(prompt: string) {
    this.item.prompt = prompt;
    this.itemChanged.emit(this.currentItem());
  }

  addResponse(value: string): void {
    this.responses.push(this.formBuilder.group({samplecontent: value}));
    this.responseAdded = true;
  }

  removeResponse(): void {
    if (this.deleteResponseIndex !== -1) {
      this.responses.removeAt(this.deleteResponseIndex);
      this.deleteResponseIndex = -1;
    }
  }

  private copyPromptFromFormIntoItem(): void {
    this.item.prompt = this.promptComponent.value;
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

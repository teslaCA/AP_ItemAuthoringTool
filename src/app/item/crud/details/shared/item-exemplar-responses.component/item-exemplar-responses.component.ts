import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormArray, FormBuilder} from "@angular/forms";

@Component({
  selector: 'item-exemplar-responses',
  templateUrl: './item-exemplar-responses.component.html',
  styleUrls: ['./item-exemplar-responses.component.less']
})
export class ItemExemplarResponsesComponent implements OnInit {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly exemplarResponses: string[];
  @Output() readonly exemplarResponsesChange = new EventEmitter<string[]>();
  form = this.fb.group({exemplarResponses: this.fb.array([])});

  get formExemplarResponses(): FormArray {
    return this.form.get('exemplarResponses') as FormArray;
  }

  get currentExemplarResponses(): string[] {
    return this.form.get('exemplarResponses').value;
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    // Reset form data and flags
    this.form.reset();
    this.form.setControl('exemplarResponses', this.fb.array(this.exemplarResponses));

    // Disable form if read-only
    if (this.isReadOnly) {
      this.form.disable();
    }

    // Fire event on changes
    this.form.valueChanges.subscribe(
      () => {
        this.exemplarResponsesChange.emit(this.currentExemplarResponses);
      });
  }

  addExemplarResponse(): void {
    this.formExemplarResponses.push(this.fb.control(null));
  }

  removeExemplarResponse(index: number): void {
    this.formExemplarResponses.removeAt(index);
  }
}

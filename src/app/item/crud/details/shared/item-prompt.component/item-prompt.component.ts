import {Component, EventEmitter, Input, OnChanges, Output} from "@angular/core";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'item-prompt',
  templateUrl: './item-prompt.component.html',
  styleUrls: ['./item-prompt.component.less']
})
export class ItemPromptComponent implements OnChanges {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly prompt: string;
  @Output() readonly promptChange = new EventEmitter<string>();
  readonly form = this.formBuilder.group({
    prompt: ''
  });

  get currentPrompt(): string {
    return this.form.value.prompt;
  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnChanges() {
    // Reset form data and flags
    this.form.reset({
      prompt: this.prompt
    });

    // Disable form if read-only
    if (this.isReadOnly) {
      this.form.disable();
    }

    // Wire up to fire event on changes
    this.form.valueChanges.subscribe(
      () => {
        this.promptChange.emit(this.currentPrompt);
      });
  }
}

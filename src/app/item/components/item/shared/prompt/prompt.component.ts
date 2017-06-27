import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.less']
})
export class PromptComponent implements OnInit {
  form = this.formBuilder.group({
    prompt: ''
  });
  @Input() isReadOnly: boolean;
  @Input() prompt: string;
  @Output() promptChanged = new EventEmitter<string>();

  get value(): string {
    return this.form.get('prompt').value;
  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // Disable form if read-only
    if (this.isReadOnly) {
      this.form.disable();
    }

    // Set form data
    this.form.setValue({
      prompt: this.prompt
    });

    // Emit event whenever form changes
    this.form.valueChanges.subscribe(() => {
      this.promptChanged.emit(this.value);
    });
  }
}

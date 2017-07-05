import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Item} from "../../../services/item.service/item";
import {StimItem} from "../../../services/item.service/stim-item";

@Component({
  selector: 'stim-item',
  templateUrl: './stim-item.component.html',
  styleUrls: ['./stim-item.component.less']
})
export class StimItemComponent implements OnInit {
  form: FormGroup;
  @Input() item: StimItem;
  @Input() isView: boolean;
  @Output() itemChanged = new EventEmitter<Item>();

  get currentItem(): StimItem {
    // Copy form to model
    this.item.prompt = this.form.get('prompt').value;

    return this.item;
  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // Copy model to form
    this.form = this.formBuilder.group({
      prompt: this.item.prompt
    });

    // Disable if read-only
    if (this.isView) {
      this.form.disable();
    }

    // Emit event on change
    this.form.valueChanges.subscribe(
      () => {
        this.itemChanged.emit(this.currentItem);
      });
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Item} from "../../../../services/item/item";
import {StimItem} from "../../../../services/item/stim-item";

@Component({
  selector: 'stim-item',
  templateUrl: './stim-item.component.html',
  styleUrls: ['./stim-item.component.less']
})
export class StimItemComponent implements OnInit {
  passageForm: FormGroup;
  @Input() item: StimItem;
  @Input() isView: boolean;
  @Output() itemChanged = new EventEmitter<Item>();

  get currentItem(): StimItem {
    // Copy form to model
    this.item.passage = this.passageForm.get('passage').value;

    return this.item;
  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // Copy model to form
    this.passageForm = this.formBuilder.group({
      passage: this.item.passage
    });

    // Disable if read-only
    if (this.isView) {
      this.passageForm.disable();
    }

    // Emit event on change
    this.passageForm.valueChanges.subscribe(
      () => {
        this.itemChanged.emit(this.currentItem);
      });
  }
}

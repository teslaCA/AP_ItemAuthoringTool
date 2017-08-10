import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ItemBraille} from "../../../services/item.service/item-braille";
import {FormBuilder} from "@angular/forms";
import {Logger} from "../../../../core/logger.service/logger.service";

@Component({
  selector: 'item-braille-tab',
  templateUrl: './item-braille-tab.component.html',
  styleUrls: ['./item-braille-tab.component.less']
})
export class ItemBrailleTabComponent implements OnChanges {
  @Input() isReadOnly: boolean;
  @Input() itemBraille: ItemBraille;
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

  ngOnChanges() {
    // Reset form data and flags
    this.form.reset({
      isBrailleRequired: this.itemBraille.isBrailleRequired,
      isBrailleContentProvided: this.itemBraille.isBrailleContentProvided
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
}

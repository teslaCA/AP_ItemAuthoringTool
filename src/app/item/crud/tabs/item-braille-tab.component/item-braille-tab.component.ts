import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ItemBraille} from "../../../services/item.service/item-braille";
import {FormBuilder} from "@angular/forms";
import {Logger} from "../../../../core/logger.service/logger.service";

@Component({
  selector: 'item-braille-tab',
  templateUrl: './item-braille-tab.component.html',
  styleUrls: ['./item-braille-tab.component.less']
})
export class ItemBrailleTabComponent implements OnChanges, OnInit {
  @Input() isReadOnly: boolean;
  @Input() itemBraille: ItemBraille;
  @Output() itemBrailleChanged = new EventEmitter<ItemBraille>();
  readonly form = this.formBuilder.group({
    doesThisItemRequireBraille: '',
    hasAllBrailleContentBeenProvided: ''
  });

  get currentItemBraille(): ItemBraille {
    let braille = new ItemBraille();
    braille.doesThisItemRequireBraille = this.form.value.doesThisItemRequireBraille;
    braille.hasAllBrailleContentBeenProvided = this.form.value.hasAllBrailleContentBeenProvided;
    return braille;
  }

  constructor(private formBuilder: FormBuilder,
              private logger: Logger) { }

  ngOnInit() {
  }

  ngOnChanges() {
    // Reset form data and flags
    this.form.reset({
      doesThisItemRequireBraille: this.itemBraille.doesThisItemRequireBraille,
      hasAllBrailleContentBeenProvided: this.itemBraille.hasAllBrailleContentBeenProvided
    });

    // Disable form if read-only
    if (this.isReadOnly) {
      this.form.disable();
    }

    // Fire event on changes
    this.form.valueChanges.subscribe(
      () => {
        this.logger.debug(`Updating Braille flags to 
        Requires Braille: '${this.form.value.doesThisItemRequireBraille}'
        Braille Content Provided: '${this.form.value.hasAllBrailleContentBeenProvided}'
        `);

        this.itemBrailleChanged.emit(this.currentItemBraille);
      });
  }
}

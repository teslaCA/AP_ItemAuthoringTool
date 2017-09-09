import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {TutItem} from "../../../services/item.service/models/type/tut-item";
import {ItemPromptComponent} from "../shared/item-prompt.component/item-prompt.component";
import {Item} from "../../../services/item.service/models/base/item";

@Component({
  selector: 'item-tut-details',
  templateUrl: './item-tut-details.component.html',
  styleUrls: ['./item-tut-details.component.less']
})
export class ItemTutDetailsComponent {

  @Input() readonly isReadOnly: boolean;
  @Input() readonly item: TutItem;
  @Output() readonly itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemPromptComponent) itemPromptComponent;

  get currentItem(): TutItem {
    this.item.prompt = this.itemPromptComponent.currentText;
    return this.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem);
  }
}

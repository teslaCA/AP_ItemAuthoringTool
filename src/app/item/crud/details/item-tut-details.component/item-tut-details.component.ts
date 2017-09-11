import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {TutItem, TutItemContext} from "../../../services/item.service/models/type/tut-item";
import {ItemPromptComponent} from "../shared/item-prompt.component/item-prompt.component";
import {Item} from "../../../services/item.service/models/base/item";

@Component({
  selector: 'item-tut-details',
  templateUrl: './item-tut-details.component.html',
  styleUrls: ['./item-tut-details.component.less']
})
export class ItemTutDetailsComponent {

  @Input() readonly isReadOnly: boolean;
  @Input() readonly itemContext: TutItemContext;
  @Output() readonly itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemPromptComponent) itemPromptComponent;

  get currentItem(): TutItem {
    this.itemContext.item.core.content = this.itemPromptComponent.currentText;
    return this.itemContext.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem);
  }
}

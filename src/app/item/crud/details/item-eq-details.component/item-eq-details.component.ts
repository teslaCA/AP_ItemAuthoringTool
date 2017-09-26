import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../../services/item.service/models/base/item";
import {ItemPromptComponent} from "../shared/item-prompt.component/item-prompt.component";
import {EqItem, EqItemContext} from "../../../services/item.service/models/type/eq-item";

@Component({
  selector: 'item-eq-details',
  templateUrl: './item-eq-details.component.html',
  styleUrls: ['./item-eq-details.component.less']
})
export class ItemEqDetailsComponent {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly itemContext: EqItemContext;
  @Output() readonly itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemPromptComponent) itemPromptComponent;

  get currentItem(): EqItem {
    this.itemContext.item.core.prompt = this.itemPromptComponent.currentText;
    return this.itemContext.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem);
  }
}

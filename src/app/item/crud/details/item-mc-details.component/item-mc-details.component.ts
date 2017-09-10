import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../../services/item.service/models/base/item";
import {ItemPromptComponent} from "../shared/item-prompt.component/item-prompt.component";
import {McItem, McItemContext} from "../../../services/item.service/models/type/mc-item";
import {ItemMcOptionsComponent} from "../shared/item-mc-options.component/item-mc-options.component";

@Component({
  selector: 'item-mc-details',
  templateUrl: './item-mc-details.component.html',
  styleUrls: ['./item-mc-details.component.less']
})
export class ItemMcDetailsComponent {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly itemContext: McItemContext;
  @Output() readonly itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemPromptComponent) itemPromptComponent;
  @ViewChild(ItemMcOptionsComponent) itemMcOptionsComponent;

  get currentItem(): McItem {
    this.itemContext.item.core.prompt = this.itemPromptComponent.currentText;
    this.itemContext.item.core.options = this.itemMcOptionsComponent.currentOptions;
    return this.itemContext.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem);
  }
}

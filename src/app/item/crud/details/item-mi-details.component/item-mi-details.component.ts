import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../../services/item.service/models/base/item";
import {ItemPromptComponent} from "../shared/item-prompt.component/item-prompt.component";
import {MiItem, MiItemContext} from "../../../services/item.service/models/type/mi-item";
import {ItemMiTableComponent} from "../shared/item-mi-table.component/item-mi-table.component";

@Component({
  selector: 'item-mi-details',
  templateUrl: './item-mi-details.component.html',
  styleUrls: ['./item-mi-details.component.less']
})
export class ItemMiDetailsComponent {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly itemContext: MiItemContext;
  @Output() readonly itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemPromptComponent) itemPromptComponent;
  @ViewChild(ItemMiTableComponent) itemMiTableComponent;

  get currentItem(): MiItem {
    this.itemContext.item.core.prompt = this.itemPromptComponent.currentText;
    this.itemContext.item.core.table = this.itemMiTableComponent.currentTable;
    return this.itemContext.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem);
  }
}

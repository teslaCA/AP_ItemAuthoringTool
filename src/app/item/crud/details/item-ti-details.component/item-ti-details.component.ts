import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../../services/item.service/models/base/item";
import {ItemPromptComponent} from "../shared/item-prompt.component/item-prompt.component";
import {TiItem} from "../../../services/item.service/models/type/ti-item";
import {ItemTiTableComponent} from "../shared/item-ti-table.component/item-ti-table.component";

@Component({
  selector: 'item-ti-details',
  templateUrl: './item-ti-details.component.html',
  styleUrls: ['./item-ti-details.component.less']
})
export class ItemTiDetailsComponent {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly item: TiItem;
  @Output() readonly itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemPromptComponent) itemPromptComponent;
  @ViewChild(ItemTiTableComponent) itemTiTableComponent;

  get currentItem(): TiItem {
    this.item.prompt = this.itemPromptComponent.currentText;
    this.item.table = this.itemTiTableComponent.currentTable;
    return this.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem);
  }
}

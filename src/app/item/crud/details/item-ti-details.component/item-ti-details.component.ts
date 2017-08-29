import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../../services/item.service/item";
import {SaItem} from "../../../services/item.service/sa-item";
import {ItemPromptComponent} from "../shared/item-prompt.component/item-prompt.component";

@Component({
  selector: 'item-ti-details',
  templateUrl: './item-ti-details.component.html',
  styleUrls: ['./item-ti-details.component.less']
})
export class ItemTiDetailsComponent {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly item: SaItem;
  @Output() readonly itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemPromptComponent) itemPromptComponent;

  get currentItem(): SaItem {
    this.item.prompt = this.itemPromptComponent.currentText;
    return this.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem);
  }
}

import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../../services/item.service/item";
import {ItemPromptComponent} from "../shared/item-prompt.component/item-prompt.component";
import {MsItem} from "../../../services/item.service/ms-item";
import {ItemMsOptionsComponent} from "../shared/item-ms-options.component/item-ms-options.component";

@Component({
  selector: 'item-ms-details',
  templateUrl: './item-ms-details.component.html',
  styleUrls: ['./item-ms-details.component.less']
})
export class ItemMsDetailsComponent {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly item: MsItem;
  @Output() readonly itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemPromptComponent) itemPromptComponent;
  @ViewChild(ItemMsOptionsComponent) itemMcOptionsComponent;

  get currentItem(): MsItem {
    this.item.prompt = this.itemPromptComponent.currentText;
    this.item.options = this.itemMcOptionsComponent.currentOptions;
    return this.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem);
  }
}

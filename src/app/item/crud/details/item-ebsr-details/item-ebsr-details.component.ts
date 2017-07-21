import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../../services/item.service/item";
import {ItemPromptComponent} from "../shared/item-prompt.component/item-prompt.component";
import {EbsrItem} from "../../../services/item.service/ebsr-item";
import {ItemMcOptionsComponent} from "../shared/item-mc-options.component/item-mc-options.component";
import {ItemMsOptionsComponent} from "../shared/item-ms-options.component/item-ms-options.component";

@Component({
  selector: 'item-ebsr-details',
  templateUrl: './item-ebsr-details.component.html',
  styleUrls: ['./item-ebsr-details.component.less']
})
export class ItemEbsrDetailsComponent {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly item: EbsrItem;
  @Output() readonly itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemPromptComponent) itemPromptComponent;
  @ViewChild(ItemMcOptionsComponent) itemMcOptionsComponent;
  @ViewChild(ItemMsOptionsComponent) itemMsOptionsComponent;

  get currentItem(): EbsrItem {
    this.item.prompt = this.itemPromptComponent.currentText;
    this.item.partA = this.itemMcOptionsComponent.currentOptions;
    this.item.partB = this.itemMsOptionsComponent.currentOptions;
    return this.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem);
  }
}

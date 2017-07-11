import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";

import {Item} from "../../services/item.service/item";
import {ItemSaDetailsComponent} from "./item-sa-details.component/item-sa-details.component";
import {ItemStimDetailsComponent} from "./item-stim-details.component/item-stim-details.component";
import {ItemWerDetailsComponent} from "./item-wer-details.component/item-wer-details.component";
import {ItemMcDetailsComponent} from "./item-mc-details.component/item-mc-details.component";

@Component({
  selector: 'item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.less']
})
export class ItemDetailsComponent {
  @Input() item: Item;
  @Input() isReadOnly: boolean;
  @Output() itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemMcDetailsComponent) itemMcDetailsComponent;
  @ViewChild(ItemSaDetailsComponent) itemSaDetailsComponent;
  @ViewChild(ItemStimDetailsComponent) itemStimDetailsComponent;
  @ViewChild(ItemWerDetailsComponent) itemWerDetailsComponent;

  get currentItem(): Item {
    switch (this.item.type) {
      case 'mc':
        return this.itemMcDetailsComponent.item;
      case 'sa':
        return this.itemSaDetailsComponent.item;
      case 'stim':
        return this.itemStimDetailsComponent.item;
      case 'wer':
        return this.itemWerDetailsComponent.item;
      default:
        throw new Error(`Cannot get current item of unknown type ${this.item.type}`);
    }
  }

  onItemChanged(item: Item) {
    this.itemChanged.emit(item);
  }
}

import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";

import {Item} from "../../services/item.service/models/base/item";
import {ItemSaDetailsComponent} from "./item-sa-details.component/item-sa-details.component";
import {ItemStimDetailsComponent} from "./item-stim-details.component/item-stim-details.component";
import {ItemWerDetailsComponent} from "./item-wer-details.component/item-wer-details.component";
import {ItemMcDetailsComponent} from "./item-mc-details.component/item-mc-details.component";
import {ItemMiDetailsComponent} from "./item-mi-details.component/item-mi-details.component";
import {ItemMsDetailsComponent} from "./item-ms-details.component/item-ms-details.component";
import {ItemTutDetailsComponent} from "./item-tut-details.component/item-tut-details.component";
import {ItemEbsrDetailsComponent} from "./item-ebsr-details/item-ebsr-details.component";
import {ItemTiDetailsComponent} from "./item-ti-details.component/item-ti-details.component";
import {ItemContext} from "../../services/item.service/models/base/item-context";

@Component({
  selector: 'item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.less']
})
export class ItemDetailsComponent {
  @Input() itemContext: ItemContext;
  @Input() isReadOnly: boolean;
  @Output() itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemEbsrDetailsComponent) itemEbsrDetailsComponent;
  @ViewChild(ItemTutDetailsComponent) itemTutDetailsComponent;
  @ViewChild(ItemMcDetailsComponent) itemMcDetailsComponent;
  @ViewChild(ItemMiDetailsComponent) itemMiDetailsComponent;
  @ViewChild(ItemMsDetailsComponent) itemMsDetailsComponent;
  @ViewChild(ItemSaDetailsComponent) itemSaDetailsComponent;
  @ViewChild(ItemStimDetailsComponent) itemStimDetailsComponent;
  @ViewChild(ItemTiDetailsComponent) itemTiDetailsComponent;
  @ViewChild(ItemWerDetailsComponent) itemWerDetailsComponent;

  get currentItem(): Item {
    switch (this.itemContext.item.type) {
      case 'ebsr':
        return this.itemEbsrDetailsComponent.itemContext.item;
      case 'tut':
        return this.itemTutDetailsComponent.itemContext.item;
      case 'mc':
        return this.itemMcDetailsComponent.itemContext.item;
      case 'mi':
          return this.itemMiDetailsComponent.itemContext.item;
      case 'ms':
        return this.itemMsDetailsComponent.itemContext.item;
      case 'sa':
        return this.itemSaDetailsComponent.itemContext.item;
      case 'stim':
        return this.itemStimDetailsComponent.itemContext.item;
      case 'ti':
        return this.itemTiDetailsComponent.itemContext.item;
      case 'wer':
        return this.itemWerDetailsComponent.itemContext.item;
      default:
        throw new Error(`Cannot get current item of unknown type ${this.itemContext.item.type}`);
    }
  }

  onItemChanged(item: Item) {
    this.itemChanged.emit(item);
  }
}

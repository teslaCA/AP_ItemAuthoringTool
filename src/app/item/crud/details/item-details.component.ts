import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";

import {Item} from "../../services/item.service/item";
import {ItemSaDetailsComponent} from "./item-sa-details.component/item-sa-details.component";
import {ItemStimDetailsComponent} from "./item-stim-details.component/item-stim-details.component";
import {ItemWerDetailsComponent} from "./item-wer-details.component/item-wer-details.component";

@Component({
  selector: 'item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.less']
})
export class ItemDetailsComponent {
  @Input() item: Item;
  @Input() isReadOnly: boolean;
  @Output() itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemSaDetailsComponent) saItemDetailsComponent;
  @ViewChild(ItemStimDetailsComponent) stimItemDetailsComponent;
  @ViewChild(ItemWerDetailsComponent) werItemDetailsComponent;

  get currentItem(): Item {
    switch (this.item.type) {
      case 'sa':
        return this.saItemDetailsComponent.item;
      case 'stim':
        return this.stimItemDetailsComponent.item;
      case 'wer':
        return this.werItemDetailsComponent.item;
      default:
        throw new Error(`Cannot get current item of unknown type ${this.item.type}`);
    }
  }

  onItemChanged(item: Item) {
    this.itemChanged.emit(item);
  }
}

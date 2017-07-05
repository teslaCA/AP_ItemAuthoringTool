import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";

import {Item} from "../../services/item.service/item";
import {SaItemDetailsComponent} from "./sa-item-details.component/sa-item-details.component";
import {StimItemDetailsComponent} from "./stim-item-details.component/stim-item-details.component";
import {WerItemDetailsComponent} from "./wer-item-details.component/wer-item-details.component";

@Component({
  selector: 'item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.less']
})
export class ItemDetailsComponent {
  @Input() item: Item;
  @Input() isReadOnly: boolean;
  @Output() itemChanged = new EventEmitter<Item>();
  @ViewChild(SaItemDetailsComponent) saItemDetailsComponent;
  @ViewChild(StimItemDetailsComponent) stimItemDetailsComponent;
  @ViewChild(WerItemDetailsComponent) werItemDetailsComponent;

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

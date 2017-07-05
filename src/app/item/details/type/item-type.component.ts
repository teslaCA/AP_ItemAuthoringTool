import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";

import {Item} from "../../services/item.service/item";
import {SaItemComponent} from "./sa-item.component/sa-item.component";
import {StimItemComponent} from "./stim-item.component/stim-item.component";
import {WerItemComponent} from "./wer-item.component/wer-item.component";

@Component({
  selector: 'item-type',
  templateUrl: './item-type.component.html',
  styleUrls: ['./item-type.component.less']
})
export class ItemTypeComponent {
  @Input() item: Item;
  @Input() isReadOnly: boolean;
  @Output() itemChanged = new EventEmitter<Item>();
  @ViewChild(SaItemComponent) saItemComponent;
  @ViewChild(StimItemComponent) stimItemComponent;
  @ViewChild(WerItemComponent) werItemComponent;

  get currentItem(): Item {
    switch (this.item.type) {
      case 'sa':
        return this.saItemComponent.currentItem();
      case 'stim':
        return this.stimItemComponent.currentItem();
      case 'wer':
        return this.werItemComponent.currentItem();
      default:
        throw new Error(`Cannot get form item for unknown type ${this.item.type}`);
    }
  }

  onItemChanged(item: Item) {
    this.itemChanged.emit(item);
  }
}

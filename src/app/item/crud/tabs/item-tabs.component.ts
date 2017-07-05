import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../services/item.service/item";
import {ItemType} from "../../services/item-type.service/item-type";
import {NormalItem} from "../../services/item.service/normal-item";
import {ItemStimulusTabComponent} from "./item-stimulus-tab.component/item-stimulus-tab.component";

@Component({
  selector: 'item-tabs',
  templateUrl: './item-tabs.component.html',
  styleUrls: ['./item-tabs.component.less']
})
export class ItemTabsComponent {
  @Input() item: Item;
  @Input() itemType: ItemType;
  @Input() selected: string;
  @Input() isReadOnly: boolean;
  @Output() itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemStimulusTabComponent) itemStimulusTabComponent;

  get linkedStimulusId(): string {
    return (this.item as NormalItem).stimulusId;
  }

  isSelected(detail: string): boolean {
    return this.selected === detail;
  }

  select(detail: string): void {
    this.selected = detail;
  }

  onItemChanged(): void {
    this.itemChanged.emit(this.prepareItem());
  }

  private prepareItem(): Item {
    // Capture changes to stimulusId
    if (this.item instanceof NormalItem) {
      this.item.stimulusId = this.itemStimulusTabComponent.stimulusId;
    }

    return this.item;
  }
}

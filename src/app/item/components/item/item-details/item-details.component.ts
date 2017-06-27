import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../../services/item/item";
import {ItemType} from "../../../services/item-type/item-type";
import {NormalItem} from "../../../services/item/normal-item";
import {ItemLinkedStimulusComponent} from "./item-linked-stimulus/item-linked-stimulus.component";

@Component({
  selector: 'item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.less']
})
export class ItemDetailsComponent {
  @Input() item: Item;
  @Input() itemType: ItemType;
  @Input() selected: string;
  @Input() isReadOnly: boolean;
  @Output() itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemLinkedStimulusComponent) itemLinkedStimulusComponent;

  get linkedStimulusId(): string {
    return (this.item as NormalItem).linkedStimulusId;
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
    // Capture changes to linkedStimulusId
    if (this.item instanceof NormalItem) {
      this.item.linkedStimulusId = this.itemLinkedStimulusComponent.linkedStimulusId;
    }

    return this.item;
  }
}

import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../services/item.service/item";
import {ItemType} from "../../services/item-type.service/item-type";
import {NormalItem} from "../../services/item.service/normal-item";
import {ItemStimulusTabComponent} from "./item-stimulus-tab.component/item-stimulus-tab.component";
import {ItemWorkflowService} from "../../services/item-workflow.service/item-workflow.service";
import {ItemWorkflowTabComponent} from "./item-workflow-tab.component/item-workflow-tab.component";

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
  @ViewChild(ItemWorkflowTabComponent) itemWorkflowTabComponent;

  get linkedStimulusId(): string {
    return (this.item as NormalItem).stimulusId;
  }

  isSelected(tab: string): boolean {
    return this.selected === tab;
  }

  select(tab: string): void {
    this.selected = tab;
  }

  onItemChanged(): void {
    this.itemChanged.emit(this.prepareItem());
  }

  private prepareItem(): Item {
    // Capture changes to stimulusId
    if (this.itemStimulusTabComponent && this.item instanceof NormalItem) {
      this.item.stimulusId = this.itemStimulusTabComponent.stimulusId;
    }

    // Capture changes to workflowStatusCode
    if (this.itemWorkflowTabComponent) {
      this.item.workflowStatusCode = this.itemWorkflowTabComponent.currentWorkflowStatusCode;
    }

    return this.item;
  }
}

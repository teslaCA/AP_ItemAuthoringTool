import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Location} from "@angular/common";
import {Item} from "../../services/item.service/item";
import {ItemType} from "../../services/item-type.service/item-type";
import {NormalItem} from "../../services/item.service/normal-item";
import {ItemStimulusTabComponent} from "./item-stimulus-tab.component/item-stimulus-tab.component";
import {ItemWorkflowTabComponent} from "./item-workflow-tab.component/item-workflow-tab.component";
import {ItemTutorialTabComponent} from "./item-tutorial-tab.component/item-tutorial-tab.component";

@Component({
  selector: 'item-tabs',
  templateUrl: './item-tabs.component.html',
  styleUrls: ['./item-tabs.component.less']
})
export class ItemTabsComponent {
  validTabs = ['history', 'stimulus', 'tutorial', 'workflow'];
  @Input() item: Item;
  @Input() itemType: ItemType;
  @Input() selected: string;
  @Input() isReadOnly: boolean;
  @Output() tabChanged = new EventEmitter<String>();
  @Output() itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemStimulusTabComponent) itemStimulusTabComponent;
  @ViewChild(ItemWorkflowTabComponent) itemWorkflowTabComponent;
  @ViewChild(ItemTutorialTabComponent) itemTutorialTabComponent;

  get linkedStimulusId(): string {
    return (this.item as NormalItem).stimulusId;
  }

  get linkedTutorialId(): string {
    return (this.item as NormalItem).tutorialId;
  }

  constructor(private location: Location) {
  }

  isSelected(tab: string): boolean {
    let validSelected = this.selected;
    // Check if selected tab name is supported
    if (this.validTabs.indexOf(this.selected) < 0) {
      // Default to first valid tab name
      validSelected = this.validTabs[0];
    }

    return validSelected === tab;
  }

  select(tab: string): void {
    // Reload tab content
    this.selected = tab;
    // Update URL to reflect new tab. This does NOT cause the entire page to reload
    this.location.go("/item/" + this.item.id + "/" + tab);
    this.tabChanged.emit(this.selected);
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

    if (this.itemTutorialTabComponent && this.item instanceof NormalItem) {
      this.item.tutorialId = this.itemTutorialTabComponent.tutorialId;
    }

    return this.item;
  }
}

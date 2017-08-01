import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Location} from "@angular/common";
import {Item} from "../../services/item.service/item";
import {ItemType} from "../../services/item-type.service/item-type";
import {NormalItem} from "../../services/item.service/normal-item";
import {ItemWorkflowTabComponent} from "./item-workflow-tab.component/item-workflow-tab.component";
import {itemTypes} from "../../services/item-type.service/item-types";
import {ItemAssociationTabComponent} from "./item-association-tab.component/item-association-tab.component";

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
  @ViewChild("stimulus") itemStimulusTabComponent: ItemAssociationTabComponent;
  @ViewChild(ItemWorkflowTabComponent) itemWorkflowTabComponent;
  @ViewChild("tutorial") itemTutorialTabComponent: ItemAssociationTabComponent;

  get associatedStimulusId(): string {
    return (this.item as NormalItem).stimulusId;
  }

  get associatedTutorialId(): string {
    return (this.item as NormalItem).tutorialId;
  }

  get itemTypeStimulus() {
    return itemTypes.find(type => type.code === 'stim');
  }

  get itemTypeTutorial() {
    return itemTypes.find(type => type.code === 'tut');
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
      this.item.stimulusId = this.itemStimulusTabComponent.associationId;
    }

    // Capture changes to workflowStatusCode
    if (this.itemWorkflowTabComponent) {
      this.item.workflowStatusCode = this.itemWorkflowTabComponent.currentWorkflowStatusCode;
    }

    // Capture changes to tutorialId
    if (this.itemTutorialTabComponent && this.item instanceof NormalItem) {
      this.item.tutorialId = this.itemTutorialTabComponent.associationId;
    }

    return this.item;
  }
}

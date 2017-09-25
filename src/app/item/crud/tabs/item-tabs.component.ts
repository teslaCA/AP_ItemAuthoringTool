import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Location} from "@angular/common";
import {AssessmentItem, Item} from "../../services/item.service/models/base/item";
import {ItemType} from "../../services/item-type.service/item-type";
import {ItemWorkflowTabComponent} from "./item-workflow-tab.component/item-workflow-tab.component";
import {STIM, TUT} from "../../services/item-type.service/item-types";
import {ItemAslTabComponent} from "./item-asl-tab.component/item-asl-tab.component";
import {ItemAssociationTabComponent} from "./item-association-tab.component/item-association-tab.component";
import {ItemBrailleTabComponent} from "./item-braille-tab.component/item-braille-tab.component";
import {ItemCcTabComponent} from "./item-cc-tab.component/item-cc-tab.component";
import {ItemContext} from "../../services/item.service/models/base/item-context";
import {User} from "../../../core/user.service/user";

import {
  BeganEditingEvent,
  CancelledEditingEvent,
  FinishedEditingEvent
} from "../item-edit-management.component/item-edit-management.component";

@Component({
  selector: 'item-tabs',
  templateUrl: './item-tabs.component.html',
  styleUrls: ['./item-tabs.component.less']
})
export class ItemTabsComponent {
  tab = {
    asl: 'asl',
    braille: 'braille',
    cc: 'cc',
    history: 'history',
    stimulus: 'stimulus',
    tutorial: 'tutorial',
    validation: 'validation',
    workflow: 'workflow'
  };
  validTabs = [
    this.tab.asl,
    this.tab.braille,
    this.tab.cc,
    this.tab.history,
    this.tab.stimulus,
    this.tab.tutorial,
    this.tab.validation,
    this.tab.workflow
  ];
  @Input() currentUser: User;
  @Input() itemContext: ItemContext;
  @Input() itemType: ItemType;
  @Input() selected: string;
  @Output() tabChanged = new EventEmitter<String>();
  @Output() itemChanged = new EventEmitter<Item>();
  @Output() beganEditing = new EventEmitter<BeganEditingEvent>();
  @Output() finishedEditing = new EventEmitter<FinishedEditingEvent>();
  @Output() cancelledEditing = new EventEmitter<CancelledEditingEvent>();
  @ViewChild(ItemAslTabComponent) itemAslTabComponent;
  @ViewChild(ItemBrailleTabComponent) itemBrailleTabComponent;
  @ViewChild(ItemCcTabComponent) itemCcTabComponent;
  @ViewChild("stimulus") itemStimulusTabComponent: ItemAssociationTabComponent;
  @ViewChild("tutorial") itemTutorialTabComponent: ItemAssociationTabComponent;
  @ViewChild(ItemWorkflowTabComponent) itemWorkflowTabComponent;


  get associatedStimulusId(): string {
    return (this.itemContext.item as AssessmentItem).core.stimulusId;
  }

  get associatedTutorialId(): string {
    return (this.itemContext.item as AssessmentItem).core.tutorialId;
  }

  get itemTypeStimulus() {
    return STIM;
  }

  get itemTypeTutorial() {
    return TUT;
  }

  constructor(private location: Location) {
  }

  isSelected(tab: string): boolean {
    let validSelected = this.selected;

    // TODO: Consider removing this - not sure of its purpose - shouldn't be needed if calling code is correct
    // Check if selected tab name is supported
    if (this.validTabs.indexOf(this.selected) < 0) {
      // Default to first valid tab name
      validSelected = this.validTabs[3]; // History is the default tab
    }

    return validSelected === tab;
  }

  select(tab: string): void {
    // Reload tab content
    this.selected = tab;

    // Update URL to reflect new tab. This does NOT cause the entire page to reload
    this.location.go("/item/" + this.itemContext.item.id + "/" + tab);
    this.tabChanged.emit(this.selected);
  }

  onItemChanged(): void {
    this.itemChanged.emit(this.prepareItem());
  }

  onBeganEditing(event: BeganEditingEvent): void {
    this.beganEditing.emit(event);
  }

  onCancelledEditing(event: CancelledEditingEvent): void {
    this.cancelledEditing.emit(event);
  }

  onFinishedEditing(event: FinishedEditingEvent): void {
    this.finishedEditing.emit(event);
  }

  private prepareItem(): Item {

    // Capture changes from asl tab
    if (this.itemAslTabComponent) {
      this.itemContext.item.asl.aslRequired =
          this.itemAslTabComponent.currentItemAsl.aslRequired;
      this.itemContext.item.asl.isAslProvided =
          this.itemAslTabComponent.currentItemAsl.isAslProvided;
    }

    // Capture changes from braille tab
    if (this.itemBrailleTabComponent) {
      this.itemContext.item.braille.brailleRequired =
        this.itemBrailleTabComponent.currentItemBraille.brailleRequired;
      this.itemContext.item.braille.isBrailleProvided =
        this.itemBrailleTabComponent.currentItemBraille.isBrailleProvided;
    }

    // Capture changes from cc tab
    if (this.itemCcTabComponent) {
      this.itemContext.item.cc.ccRequired =
          this.itemCcTabComponent.currentItemCc.ccRequired;
      this.itemContext.item.cc.isCcProvided =
          this.itemCcTabComponent.currentItemCc.isCcProvided;
    }

    // Capture changes from stimulus tab
    if (this.itemStimulusTabComponent && this.itemContext.item instanceof AssessmentItem) {
      this.itemContext.item.core.stimulusId = this.itemStimulusTabComponent.associationId;
    }

    // Capture changes from tutorial tab
    if (this.itemTutorialTabComponent && this.itemContext.item instanceof AssessmentItem) {
      this.itemContext.item.core.tutorialId = this.itemTutorialTabComponent.associationId;
    }

    // Capture changes from workflow tab
    if (this.itemWorkflowTabComponent) {
      this.itemContext.item.core.workflowStatusCode = this.itemWorkflowTabComponent.currentWorkflowStatusCode;
    }

    return this.itemContext.item;
  }
}

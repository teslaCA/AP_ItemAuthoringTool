import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../../services/item.service/item";
import {StimItem} from "../../../services/item.service/stim-item";
import {ItemPromptComponent} from "../shared/item-prompt.component/item-prompt.component";

@Component({
  selector: 'item-stim-details',
  templateUrl: './item-stim-details.component.html',
  styleUrls: ['./item-stim-details.component.less']
})
export class ItemStimDetailsComponent {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly item: StimItem;
  @Output() readonly itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemPromptComponent) itemPromptComponent;

  get currentItem(): StimItem {
    this.item.prompt = this.itemPromptComponent.currentPrompt;
    return this.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem)
  }
}

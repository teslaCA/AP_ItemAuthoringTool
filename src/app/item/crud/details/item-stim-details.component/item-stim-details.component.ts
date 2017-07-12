import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../../services/item.service/item";
import {StimItem} from "../../../services/item.service/stim-item";
import {ItemLabeledTextAreaComponent} from "../shared/item-labeled-textarea.component/item-labeled-textarea.component";

@Component({
  selector: 'item-stim-details',
  templateUrl: './item-stim-details.component.html',
  styleUrls: ['./item-stim-details.component.less']
})
export class ItemStimDetailsComponent {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly item: StimItem;
  @Output() readonly itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemLabeledTextAreaComponent) itemPromptComponent;

  get currentItem(): StimItem {
    this.item.prompt = this.itemPromptComponent.currentText;
    return this.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem);
  }
}

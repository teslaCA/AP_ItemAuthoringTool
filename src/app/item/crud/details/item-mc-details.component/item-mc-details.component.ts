import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../../services/item.service/item";
import {ItemLabeledTextAreaComponent} from "../shared/item-labeled-textarea.component/item-labeled-textarea.component";
import {McItem} from "../../../services/item.service/mc-item";
import {ItemMcOptionsComponent} from "../shared/item-mc-options.component/item-mc-options.component";

@Component({
  selector: 'item-mc-details',
  templateUrl: './item-mc-details.component.html',
  styleUrls: ['./item-mc-details.component.less']
})
export class ItemMcDetailsComponent {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly item: McItem;
  @Output() readonly itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemLabeledTextAreaComponent) itemPromptComponent;
  @ViewChild(ItemMcOptionsComponent) itemMcOptionsComponent;

  get currentItem(): McItem {
    this.item.prompt = this.itemPromptComponent.currentText;
    this.item.options = this.itemMcOptionsComponent.currentOptions;
    return this.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem);
  }
}

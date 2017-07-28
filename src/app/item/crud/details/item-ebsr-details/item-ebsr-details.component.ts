import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../../services/item.service/item";
import {ItemPromptComponent} from "../shared/item-prompt.component/item-prompt.component";
import {EbsrItem} from "../../../services/item.service/ebsr-item";
import {ItemMcOptionsComponent} from "../shared/item-mc-options.component/item-mc-options.component";
import {ItemMsOptionsComponent} from "../shared/item-ms-options.component/item-ms-options.component";

@Component({
  selector: 'item-ebsr-details',
  templateUrl: './item-ebsr-details.component.html',
  styleUrls: ['./item-ebsr-details.component.less']
})
export class ItemEbsrDetailsComponent {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly item: EbsrItem;

  @Output() readonly itemChanged = new EventEmitter<Item>();

  @ViewChild("mainPrompt") itemPromptComponent: ItemPromptComponent;
  @ViewChild("mcPrompt") itemMcPromptComponent: ItemPromptComponent;
  @ViewChild("msPrompt") itemMsPromptComponent: ItemPromptComponent;
  @ViewChild("mcOptions") itemMcOptionsComponent: ItemMcOptionsComponent;
  @ViewChild("msOptions") itemMsOptionsComponent: ItemMsOptionsComponent;

  get currentItem(): EbsrItem {
    this.item.prompt = this.itemPromptComponent.currentText;

    this.item.multipleChoice.prompt = this.itemMcPromptComponent.currentText;
    this.item.multipleChoice.options = this.itemMcOptionsComponent.currentOptions;

    this.item.multipleSelect.prompt = this.itemMsPromptComponent.currentText;
    this.item.multipleSelect.options = this.itemMsOptionsComponent.currentOptions;

    return this.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem);
  }
}

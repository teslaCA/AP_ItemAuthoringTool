import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../../services/item.service/models/base/item";
import {ItemPromptComponent} from "../shared/item-prompt.component/item-prompt.component";
import {EbsrItem, EbsrItemContext} from "../../../services/item.service/models/type/ebsr-item";
import {ItemMcOptionsComponent} from "../shared/item-mc-options.component/item-mc-options.component";
import {ItemMsOptionsComponent} from "../shared/item-ms-options.component/item-ms-options.component";

@Component({
  selector: 'item-ebsr-details',
  templateUrl: './item-ebsr-details.component.html',
  styleUrls: ['./item-ebsr-details.component.less']
})
export class ItemEbsrDetailsComponent {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly itemContext: EbsrItemContext;
  @Output() readonly itemChanged = new EventEmitter<Item>();
  @ViewChild("prompt") prompt: ItemPromptComponent;
  @ViewChild("partAPrompt") partAPrompt: ItemPromptComponent;
  @ViewChild("partAOptions") partAOptions: ItemMcOptionsComponent;
  @ViewChild("partBPrompt") partBPrompt: ItemPromptComponent;
  @ViewChild("partBOptions") partBOptions: ItemMsOptionsComponent;

  get currentItem(): EbsrItem {
    this.itemContext.item.core.prompt = this.prompt.currentText;
    this.itemContext.item.core.partAPrompt = this.partAPrompt.currentText;
    this.itemContext.item.core.partAOptions = this.partAOptions.currentOptions;
    this.itemContext.item.core.partBPrompt = this.partBPrompt.currentText;
    this.itemContext.item.core.partBOptions = this.partBOptions.currentOptions;
    return this.itemContext.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem);
  }
}

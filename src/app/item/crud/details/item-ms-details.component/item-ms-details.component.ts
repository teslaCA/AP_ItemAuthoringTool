import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../../services/item.service/models/base/item";
import {ItemPromptComponent} from "../shared/item-prompt.component/item-prompt.component";
import {MsItem, MsItemContext} from "../../../services/item.service/models/type/ms-item";
import {ItemMsOptionsComponent} from "../shared/item-ms-options.component/item-ms-options.component";

@Component({
  selector: 'item-ms-details',
  templateUrl: './item-ms-details.component.html',
  styleUrls: ['./item-ms-details.component.less']
})
export class ItemMsDetailsComponent {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly itemContext: MsItemContext;
  @Output() readonly itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemPromptComponent) itemPromptComponent;
  @ViewChild(ItemMsOptionsComponent) itemMcOptionsComponent;

  get currentItem(): MsItem {
    this.itemContext.item.core.prompt = this.itemPromptComponent.currentText;
    this.itemContext.item.core.options = this.itemMcOptionsComponent.currentOptions;
    return this.itemContext.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem);
  }
}

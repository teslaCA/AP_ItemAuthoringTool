import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../../services/item.service/models/base/item";
import {SaItem, SaItemContext} from "../../../services/item.service/models/type/sa-item";
import {ItemPromptComponent} from "../shared/item-prompt.component/item-prompt.component";
import {ItemExemplarResponsesComponent} from "../shared/item-exemplar-responses.component/item-exemplar-responses.component";

@Component({
  selector: 'item-sa-details',
  templateUrl: './item-sa-details.component.html',
  styleUrls: ['./item-sa-details.component.less']
})
export class ItemSaDetailsComponent {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly itemContext: SaItemContext;
  @Output() readonly itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemPromptComponent) itemPromptComponent;
  @ViewChild(ItemExemplarResponsesComponent) itemExemplarResponsesComponent;

  get currentItem(): SaItem {
    this.itemContext.item.core.prompt = this.itemPromptComponent.currentText;
    this.itemContext.item.core.exemplarResponses = this.itemExemplarResponsesComponent.currentExemplarResponses;
    return this.itemContext.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem);
  }
}

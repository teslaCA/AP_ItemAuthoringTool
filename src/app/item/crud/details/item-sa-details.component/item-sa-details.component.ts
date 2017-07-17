import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../../services/item.service/item";
import {SaItem} from "../../../services/item.service/sa-item";
import {ItemPromptComponent} from "../shared/item-prompt.component/item-prompt.component";
import {ItemExemplarResponsesComponent} from "../shared/item-exemplar-responses.component/item-exemplar-responses.component";

@Component({
  selector: 'item-sa-details',
  templateUrl: './item-sa-details.component.html',
  styleUrls: ['./item-sa-details.component.less']
})
export class ItemSaDetailsComponent {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly item: SaItem;
  @Output() readonly itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemPromptComponent) itemPromptComponent;
  @ViewChild(ItemExemplarResponsesComponent) itemExemplarResponsesComponent;

  get currentItem(): SaItem {
    this.item.prompt = this.itemPromptComponent.currentText;
    this.item.exemplarResponses = this.itemExemplarResponsesComponent.currentExemplarResponses;
    return this.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem);
  }
}

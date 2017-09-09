import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {Item} from "../../../services/item.service/models/base/item";
import {WerItem} from "../../../services/item.service/models/type/wer-item";
import {ItemPromptComponent} from "../shared/item-prompt.component/item-prompt.component";
import {ItemExemplarResponsesComponent} from "../shared/item-exemplar-responses.component/item-exemplar-responses.component";

@Component({
  selector: 'item-wer-details',
  templateUrl: './item-wer-details.component.html',
  styleUrls: ['./item-wer-details.component.less']
})
export class ItemWerDetailsComponent {
  @Input() readonly isReadOnly: boolean;
  @Input() readonly item: WerItem;
  @Output() readonly itemChanged = new EventEmitter<Item>();
  @ViewChild(ItemPromptComponent) itemPromptComponent;
  @ViewChild(ItemExemplarResponsesComponent) itemExemplarResponsesComponent;

  get currentItem(): WerItem {
    this.item.prompt = this.itemPromptComponent.currentText;
    this.item.exemplarResponses = this.itemExemplarResponsesComponent.currentExemplarResponses;
    return this.item;
  }

  onItemChange() {
    this.itemChanged.emit(this.currentItem);
  }
}

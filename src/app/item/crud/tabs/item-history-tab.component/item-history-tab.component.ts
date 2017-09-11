import {Component, Input, OnInit} from "@angular/core";
import {ItemHistoryService} from "../../../services/item-history.service/item-history.service";
import {ItemVersion} from "../../../services/item-history.service/item-version";
import {ItemHistoryResponse} from "../../../services/item-history.service/item-history-response";

@Component({
  selector: 'item-history-tab',
  templateUrl: './item-history-tab.component.html',
  styleUrls: ['./item-history-tab.component.less']
})
export class ItemHistoryTabComponent implements OnInit {
  @Input() itemId: string;
  itemVersions: ItemVersion[];
  diffWindow: any;

  constructor(private itemHistoryService: ItemHistoryService) {
  }

  ngOnInit() {
    if (this.itemId) {
      this.itemHistoryService.findItemHistory(this.itemId)
        .subscribe(
          (itemHistoryResponse: ItemHistoryResponse) => {
            this.itemVersions = itemHistoryResponse.versions;
          }
        );
    }
  }

  openItemDiff(_ /* event */, historyId) {
    const strWindowFeatures = "height=800,width=1200,scrollbars=yes,status=yes";
    const url = `items/${this.itemId}/diff/${historyId}`;
    this.diffWindow = window.open(url, "itemDiff", strWindowFeatures);
  }
}

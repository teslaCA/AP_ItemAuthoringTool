import {Component, Input, OnInit} from "@angular/core";
import {ItemHistoryService} from "../../../services/item-history.service/item-history.service";
import {ItemChange} from "../../../services/item-history.service/item-change";

@Component({
  selector: 'item-history-tab',
  templateUrl: './item-history-tab.component.html',
  styleUrls: ['./item-history-tab.component.less']
})
export class ItemHistoryTabComponent implements OnInit {
  @Input() itemId: string;
  itemChanges: ItemChange[];
  diffWindow: any;

  constructor(private itemHistoryService: ItemHistoryService) {
  }

  ngOnInit() {
    if (this.itemId) {
      this.itemHistoryService.findItemHistory(this.itemId)
        .subscribe(
          (itemChanges: ItemChange[]) => {
            this.itemChanges = itemChanges;
          }
        );
    }
  }

  openItemDiff(_ /* event */, historyId) {
    const strWindowFeatures = "height=800,width=1200,scrollbars=yes,status=yes";
    const url = "/diff/item/" + this.itemId + "/history/" + historyId;
    this.diffWindow = window.open(url, "itemDiff", strWindowFeatures);
  }
}

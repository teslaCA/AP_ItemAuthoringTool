import {Component, Input, OnInit} from "@angular/core";
import {ItemHistoryService} from "../../services/item-history/item-history.service";
import {ItemChange} from "../../services/item-history/item-change";

@Component({
  selector: 'item-history',
  templateUrl: './item-history.component.html',
  styleUrls: ['./item-history.component.less']
})
export class ItemHistoryComponent implements OnInit {
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

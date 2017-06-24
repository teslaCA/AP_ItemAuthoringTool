import {Component, Input, OnInit} from "@angular/core";

import {ItemHistory} from "../../services/item/item-history";
import {Logger} from "../../../core/services/logger/logger.service";
import {ItemService} from "../../services/item/item.service";

@Component({
  selector: 'item-history',
  templateUrl: './item-history.component.html',
  styleUrls: ['./item-history.component.less'],
  providers: [
    ItemService
  ]
})
export class ItemHistoryComponent implements OnInit {
  @Input() itemId: string;
  itemHistory: ItemHistory[];
  diffWindow: any;

  constructor(private logger: Logger,
              private historyService: ItemService) {
  }

  ngOnInit() {
    this.logger.debug("Item ID " + this.itemId);
    if (this.itemId) {
      this.historyService.getItemHistory(this.itemId)
        .subscribe(
          results => this.itemHistory = results,
          error => this.onError(error)
        );
    }
  }

  openItemDiff(_ /* event */, historyId) {
    const strWindowFeatures = "height=800,width=1200,scrollbars=yes,status=yes";
    const url = "/diff/item/" + this.itemId + "/history/" + historyId;
    this.diffWindow = window.open(url, "itemDiff", strWindowFeatures);
  }

  private onError(error): void {
    this.logger.error('Error Status: ' + error.status);
  }
}

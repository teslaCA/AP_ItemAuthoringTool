import {Component, Input, OnInit} from "@angular/core";

import {Logger} from "../../../core/services/logger/logger.service";
import {ItemHistoryService} from "../../services/item-history/item-history.service";
import {AlertService} from "../../../core/services/alert/alert.service";
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

  constructor(private alertService: AlertService,
              private logger: Logger,
              private itemHistoryService: ItemHistoryService) {
  }

  ngOnInit() {
    this.logger.debug("Item ID " + this.itemId);
    if (this.itemId) {
      this.itemHistoryService.findItemHistory(this.itemId)
        .subscribe(
          (itemChanges: ItemChange[]) => {
            this.itemChanges = itemChanges
          },
          error => {
            this.logger.error(`Failed to load item history, error ${JSON.stringify(error)}`);
            this.alertService.error("Error Loading Item History", `An error was encountered while loading item history`);
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

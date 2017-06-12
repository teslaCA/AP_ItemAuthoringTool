import {Component, Input, OnInit} from '@angular/core';
import {Logger} from "../../service/logger.service";
import {ItemHistoryService} from "./item-history.service";
import {ItemHistory} from "./item-history";


@Component({
  selector: 'app-item-history',
  templateUrl: './item-history.component.html',
  styleUrls: ['./item-history.component.less'],
  providers: [
    ItemHistoryService
  ]
})
export class ItemHistoryComponent implements OnInit {

  @Input()
  itemId: string;

  itemHistory: ItemHistory[];

  diffWindow: any;

  constructor(private logger: Logger, private historyService: ItemHistoryService) {
  }

  ngOnInit() {
    this.logger.debug("Item ID " + this.itemId)
    if (this.itemId) {
      this.historyService.getItemHistory(this.itemId)
        .subscribe(
          results => this.itemHistory = results,
          error => this.onError(error),
          () => {
          }
        );
    }
  }

  openItemDiff(event, historyId) {
    const strWindowFeatures = "height=800,width=1200,scrollbars=yes,status=yes";
    const url  = "/diff/item/" + this.itemId + "/history/" + historyId;
    this.diffWindow = window.open(url, "itemDiff", strWindowFeatures);
  }

  private onError(error): void {
    this.logger.error('Error Status: ' + error.status);
  }
}

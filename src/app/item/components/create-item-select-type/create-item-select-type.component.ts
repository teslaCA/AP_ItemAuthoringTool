import {Component, OnInit} from "@angular/core";
import {ItemType} from "../../services/item-type/item-type";
import {ItemTypeService} from "../../services/item-type/item-type.service";
import {ItemService} from "../../services/item.service";
import {Logger} from "../../../core/services/logger/logger.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../core/services/alert/alert.service";
import {BusyService} from "../../../core/services/busy/busy.service";
import {Item} from "../../models/item";

@Component({
  selector: 'create-item-select-type',
  templateUrl: './create-item-select-type.component.html',
  styleUrls: ['./create-item-select-type.component.less']
})
export class CreateItemSelectTypeComponent implements OnInit {
  public normalItemTypes: ItemType[];

  constructor(private logger: Logger,
              private router: Router,
              private alertService: AlertService,
              private busyService: BusyService,
              private itemService: ItemService,
              private itemTypeService: ItemTypeService) {
  }

  ngOnInit() {
    // Load normal item types
    this.busyService.show("Loading Item Types");
    this.itemTypeService
      .findNormalItemTypes()
      .subscribe(
        (itemTypes: ItemType[]) => {
          this.busyService.hide();
          this.normalItemTypes = itemTypes;
        },
        error => {
          this.logger.error(`Failed to load item types, error ${JSON.stringify(error)}`);
          this.busyService.hide();
          this.alertService.error("Error Loading Item Types", `An error was encountered while loading item types`);
        }
      );
  }

  createItem(itemTypeCode: string) {
    this.busyService.show("Initializing Item");
    this.itemService
      .beginCreateTransaction(itemTypeCode, "Beginning create")
      .subscribe(
        (item: Item) => {
          // TODO: Remove this logging
          this.logger.debug('HERE' + item.constructor.name);

          this.logger.debug(`Successfully initialized item ${JSON.stringify(item)}`);
          this.busyService.hide();
          this.router.navigateByUrl(`/item/${item.id}`);
        },
        error => {
          this.logger.error(`Failed to initialize item of type ${itemTypeCode}, error ${JSON.stringify(error)}`);
          this.busyService.hide();
          this.alertService.error("Error Initializing Item", `An error was encountered while initializing your item`);
        }
      );
  }
}

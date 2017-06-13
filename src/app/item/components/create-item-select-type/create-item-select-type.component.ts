import {Component, OnInit} from "@angular/core";
import {ItemType} from "../../models/item-type";
import {ItemTypeService} from "../../services/item-type.service";
import {ItemService} from "../../services/item.service";
import {Logger} from "../../../core/logger.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../core/alert.service";
import {BusyService} from "../../../core/busy.service/busy.service";

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
    this.normalItemTypes = this.itemTypeService.findNormalItemTypes();
  }

  createItem(itemTypeCode: string) {
    this.logger.debug(`Creating item of type ${itemTypeCode}`);
    this.busyService.show("Creating Item");
    this.itemService.beginItemCreate(itemTypeCode)
      .subscribe(
        item => {
          this.logger.debug(`Successfully created item ${JSON.stringify(item)}`);
          this.busyService.hide();
          this.router.navigateByUrl(`/item/${item.id}`);
        },
        error => {
          this.logger.error(`Failed to create item of type ${itemTypeCode}, error ${JSON.stringify(error)}`);
          this.busyService.hide();
          this.alertService.error("Error Creating Item", `An error was encountered while creating your item`);
        }
      );
  }
}

import {Component, OnInit} from "@angular/core";
import {ItemType} from "../../../services/item-type/item-type";
import {ItemTypeService} from "../../../services/item-type/item-type.service";
import {ItemService} from "../../../services/item/item.service";
import {Router} from "@angular/router";
import {Item} from "../../../services/item/item";

@Component({
  selector: 'create-item-select-type',
  templateUrl: './create-item-select-type.component.html',
  styleUrls: ['./create-item-select-type.component.less']
})
export class CreateItemSelectTypeComponent implements OnInit {
  normalItemTypes: ItemType[];
  otherItemTypes: ItemType[];

  constructor(private router: Router,
              private itemService: ItemService,
              private itemTypeService: ItemTypeService) {
  }

  ngOnInit() {
    // Load normal item types
    this.itemTypeService
      .findNormalItemTypes()
      .subscribe(
        (itemTypes: ItemType[]) => {
          this.normalItemTypes = itemTypes;
        }
      );

    // Load other item types
    this.itemTypeService
      .findOtherItemTypes()
      .subscribe(
        (itemTypes: ItemType[]) => {
          this.otherItemTypes = itemTypes;
        }
      );
  }

  createItem(itemTypeCode: string) {
    this.itemService
      .beginCreateTransaction(itemTypeCode, "Began creation")
      .subscribe(
        (item: Item) => {
          this.router.navigateByUrl(`/item/${item.id}`);
        }
      );
  }
}

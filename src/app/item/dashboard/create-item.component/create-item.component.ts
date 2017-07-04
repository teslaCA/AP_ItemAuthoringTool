import {Component, OnInit} from "@angular/core";
import {ItemType} from "../../services/item-type.service/item-type";
import {ItemTypeService} from "../../services/item-type.service/item-type.service";
import {ItemService} from "../../services/item.service/item.service";
import {Router} from "@angular/router";
import {Item} from "../../services/item.service/item";

@Component({
  selector: 'create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.less']
})
export class CreateItemComponent implements OnInit {
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

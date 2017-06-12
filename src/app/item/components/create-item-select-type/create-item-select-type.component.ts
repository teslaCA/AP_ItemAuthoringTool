import {Component, OnInit} from "@angular/core";
import {ItemType} from "../../models/item-type";
import {ItemTypeService} from "../../services/item-type.service";

@Component({
  selector: 'create-item-select-type',
  templateUrl: './create-item-select-type.component.html',
  styleUrls: ['./create-item-select-type.component.less']
})
export class CreateItemSelectTypeComponent implements OnInit {
  public normalItemTypes: ItemType[];

  constructor(private itemTypeService: ItemTypeService) {
  }

  ngOnInit() {
    this.normalItemTypes = this.itemTypeService.findNormalItemTypes();
  }
}

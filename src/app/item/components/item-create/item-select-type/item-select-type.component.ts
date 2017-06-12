import {Component, OnInit} from "@angular/core";
import {ItemType} from "../../../models/item-type";
import {ItemTypeService} from "../../../services/item-type.service";

@Component({
  selector: 'app-item-select-type',
  templateUrl: './item-select-type.component.html',
  styleUrls: ['./item-select-type.component.less']
})
export class ItemSelectTypeComponent implements OnInit {
  public normalItemTypes: ItemType[];

  constructor(private itemTypeService: ItemTypeService) {
  }

  ngOnInit() {
    this.normalItemTypes = this.itemTypeService.findNormalItemTypes();
  }
}

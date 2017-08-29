import {Component, Input, OnInit} from "@angular/core";
import {ItemValidationService} from "../../../services/item-validation.service/item-validation.service";
import {ItemValidationError} from "../../../services/item-validation.service/item-validation-error";

@Component({
  selector: 'item-validation-tab',
  templateUrl: './item-validation-tab.component.html',
  styleUrls: ['./item-validation-tab.component.less']
})
export class ItemValidationTabComponent implements OnInit {
  @Input() itemId: string;
  itemValidationErrors: ItemValidationError[];

  constructor(private itemValidationService: ItemValidationService) {
  }

  ngOnInit() {
    if (this.itemId) {
      this.itemValidationService.findErrorMessages(this.itemId)
        .subscribe(
          (itemValidationErrors: ItemValidationError[]) => {
            this.itemValidationErrors = itemValidationErrors;
          }
        );
    }
  }
}

import {Component, Input, OnInit} from "@angular/core";
import {ItemValidationService} from "../../../services/item-validation.service/item-validation.service";
import {ItemValidationResults} from "../../../services/item-validation.service/item-validation-results";

@Component({
  selector: 'item-validation-tab',
  templateUrl: './item-validation-tab.component.html',
  styleUrls: ['./item-validation-tab.component.less']
})
export class ItemValidationTabComponent implements OnInit {
  @Input() itemId: string;
  itemValidationResults: ItemValidationResults;

  constructor(private itemValidationService: ItemValidationService) {
  }

  ngOnInit() {
    if (this.itemId) {
      this.itemValidationService.findErrorMessages(this.itemId)
        .subscribe(
          (itemValidationResults: ItemValidationResults) => {
            this.itemValidationResults = itemValidationResults;
          }
        );
    }
  }
}

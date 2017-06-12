import "rxjs/add/operator/switchMap";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../../services/item.service";
import {Logger} from "../../../core/logger.service";
import {Item} from "../../models/item";

@Component({
  selector: 'create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.less']
})
export class CreateItemComponent implements OnInit {
  private itemType: string;
  private errorMessage: string;

  constructor(private logger: Logger,
              private router: Router,
              private route: ActivatedRoute,
              private itemService: ItemService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.itemType = params['type'];
      });

    this.itemService.beginItemCreate(this.itemType)
      .subscribe(
        item => this.processSuccess(item),
        error => this.processError(error),
        () => this.logger.debug('scratchpad item created successfully')
      );
  }

  private processSuccess(item: Item): void {
    // TODO: Add validation
    const itemId = item.id;

    this.router.navigateByUrl('/item/' + itemId);
  }

  private processError(error): void {   // TODO: Strongly type parameter
    this.errorMessage = error;
  }
}

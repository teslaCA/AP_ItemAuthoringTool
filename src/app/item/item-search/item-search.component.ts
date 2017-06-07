/**
 * Created by brettdrainer on 6/3/17.
 */

import {Component} from "@angular/core";
import {Router} from "@angular/router";

import {Logger} from "../../service/logger.service";

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.less'],
})
export class ItemSearchComponent {

  constructor(private logger: Logger, private router: Router) {
  }

  search(query: string) {
    this.logger.debug("Item search for " + query);
    this.router.navigateByUrl('/item/' + query);
  }
}

/*
 * Copyright 2017 Regents of the University of California.
 *
 * Licensed under the Educational Community License, Version 2.0 (the "license");
 * you may not use this file except in compliance with the License. You may
 * obtain a copy of the license at
 *
 * https://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import "rxjs/add/operator/switchMap";
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../../service/item.service";
import {Logger} from "../../utility/logger";

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.less'],
  providers: [
    ItemService
  ]
})
export class ItemCreateComponent implements OnInit {
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

  private processSuccess(item): void {  // TODO: Strongly type parameter
    // TODO: Add validation
    const itemId = item.id;

    this.router.navigateByUrl('/item/' + itemId);
  }

  private processError(error): void {   // TODO: Strongly type parameter
    this.errorMessage = error;
  }
}

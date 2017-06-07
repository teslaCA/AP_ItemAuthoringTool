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
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {LookupService} from "../../../service/lookup.service";
import {ItemType} from "../../../model/item-type";
import {Logger} from "../../../service/logger.service";

@Component({
  selector: 'app-item-select-type',
  templateUrl: './item-select-type.component.html',
  styleUrls: ['./item-select-type.component.less'],
  providers: [LookupService]
})
export class ItemSelectTypeComponent implements OnInit {

  private _items: ItemType[];
  get items(): ItemType[] {
    return this._items;
  }

  private _other: ItemType[];
  get other(): ItemType[] {
    return this._other;
  }

  constructor(private logger: Logger,
              private router: Router,
              private lookupService: LookupService) {
  }

  ngOnInit() {
    this._items = this.lookupService.getMainItemTypes();
    this._other = this.lookupService.getOtherItemTypes();
  }

  confirmCancel(): void {
    this.logger.debug('cancel item select type...');
    this.router.navigateByUrl('/');
  }
}

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
import {Injectable} from "@angular/core";
import {ItemType} from "../model/item-type";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

const MAIN_ITEMS: ItemType[] = [
  /*
   { id: 10, type: 'ebsr', name: 'Evidence-Based Select Response (EBSR)', icon: 'fa-list'},
   { id: 11, type: 'eq', name: 'Equation (EQ)', icon: 'fa-superscript'},
   { id: 13, type: 'gi', name: 'Grid Item (GI)', icon: 'fa-bar-chart'},
   { id: 14, type: 'ht', name: 'Hot Text (HT)', icon: 'fa-fire'},
   { id: 15, type: 'mc', name: 'Multiple Choice (MC)', icon: 'fa-list-ul'},
   { id: 16, type: 'ms', name: 'Multiple Select (MS)', icon: 'fa-th-list'},
   { id: 17, type: 'mi', name: 'Match Interaction (MI)', icon: 'fa-list-ul'},
   */
  {type: 'sa', description: 'Short Answer (SA)', icon: 'fa-font', name: 'Short Answer', abbreviation: 'SA'},
  /*
   { id: 19, type: 'ti', name: 'Table Interaction (TI)', icon: 'fa-table'},
   { id: 20, type: 'wer', name: 'Writing Extended Responses (WER)', icon: 'fa-comments'}
   */
];

const OTHER_ITEMS: ItemType[] = [
  // { type: 'stim', description: 'Stimulus (STIM)', icon: 'fa-commenting-o', name: 'Stimulus', abbreviation: 'STIM'},
  {type: 'tut', description: 'Tutorial (TUT)', icon: 'fa-question-circle', name: 'Tutorial', abbreviation: 'TUT'}
];

@Injectable()
export class LookupService {
  private userResource = '/api/users/principal';
  private buildInfoResource = '/manage/info';

  constructor(private http: Http) {
  }

  getUser(): Observable<any> {
    return this.http.request(this.userResource);
  }

  getBuildInfo(): Observable<any> {
    return this.http.request(this.buildInfoResource);
  }

  getMainItemTypes(): ItemType[] {
    return MAIN_ITEMS;
  }

  getOtherItemTypes(): ItemType[] {
    return OTHER_ITEMS;
  }

  getItemDescription(itemType: string): string {
    let selectItem = MAIN_ITEMS.filter(item => item.type === itemType);

    if (selectItem != null) {
      return selectItem[0].description;
    }

    selectItem = OTHER_ITEMS.filter(item => item.type === itemType);

    if (selectItem != null) {
      return selectItem[0].description;
    }

    return '';  // TODO: Why is this hardcoded to return empty string?
  }
}

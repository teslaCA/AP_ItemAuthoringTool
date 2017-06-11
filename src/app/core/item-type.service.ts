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

import {ItemType, ItemTypeCategory} from "../model/item-type";

const itemTypes: ItemType[] = [
  // TODO: Do not delete the commented-out item types; uncomment them as they are implemented
  // {
  //   abbreviation: 'EBSR',
  //   category: ItemTypeCategory.Normal,
  //   code: 'ebsr',
  //   description: 'Evidence-Based Select Response (EBSR)',
  //   icon: 'fa-list',
  //   name: 'Evidence-Based Select Response'
  // },
  // {
  //   abbreviation: 'EQ',
  //   category: ItemTypeCategory.Normal,
  //   code: 'eq',
  //   description: 'Equation (EQ)',
  //   icon: 'fa-superscript',
  //   name: 'Equation'
  // },
  // {
  //   abbreviation: 'GI',
  //   category: ItemTypeCategory.Normal,
  //   code: 'gi',
  //   description: 'Grid Item (GI)',
  //   icon: 'fa-bar-chart',
  //   name: 'Grid Item'
  // },
  // {
  //   abbreviation: 'HT',
  //   category: ItemTypeCategory.Normal,
  //   code: 'ht',
  //   description: 'Hot Text (HT)',
  //   icon: 'fa-fire',
  //   name: 'Hot Text'
  // },
  // {
  //   abbreviation: 'MC',
  //   category: ItemTypeCategory.Normal,
  //   code: 'mc',
  //   description: 'Multiple Choice (MC)',
  //   icon: 'fa-list-ul',
  //   name: 'Multiple Choice'
  // },
  // {
  //   abbreviation: 'MS',
  //   category: ItemTypeCategory.Normal,
  //   code: 'ms',
  //   description: 'Multiple Select (MS)',
  //   icon: 'fa-th-list',
  //   name: 'Multiple Select'
  // },
  // {
  //   abbreviation: 'MI',
  //   category: ItemTypeCategory.Normal,
  //   code: 'mi',
  //   description: 'Match Interaction (MI)',
  //   icon: 'fa-list-ul',
  //   name: 'Match Interaction'
  // },
  {
    abbreviation: 'SA',
    category: ItemTypeCategory.Normal,
    code: 'sa',
    description: 'Short Answer (SA)',
    icon: 'fa-font',
    name: 'Short Answer'
  },
  // {
  //   abbreviation: 'TI',
  //   category: ItemTypeCategory.Normal,
  //   code: 'ti',
  //   description: 'Table Interaction (TI)',
  //   icon: 'fa-table',
  //   name: 'Table Interaction'
  // },
  // {
  //   abbreviation: 'WER',
  //   category: ItemTypeCategory.Normal,
  //   code: 'wer',
  //   description: 'Writing Extended Response (WER)',
  //   icon: 'fa-comments',
  //   name: 'Writing Extended Response'
  // },
  // {
  //   abbreviation: 'STIM',
  //   category: ItemTypeCategory.OtherResource,
  //   code: 'stim',
  //   description: 'Stimulus (STIM)',
  //   icon: 'fa-commenting-o',
  //   name: 'Stimulus'
  // },
  // {
  //   abbreviation: 'TUT',
  //   category: ItemTypeCategory.OtherResource,
  //   code: 'tut',
  //   description: 'Tutorial (TUT)',
  //   icon: 'fa-question-circle',
  //   name: 'Tutorial'
  // },
];

@Injectable()
export class ItemTypeService {
  findNormalItemTypes(): ItemType[] {
    return itemTypes.filter(type => type.category === ItemTypeCategory.Normal);
  }

  findItemTypeDescription(itemTypeCode: string): string {
    let itemType = itemTypes.find(type => type.code === itemTypeCode);
    return itemType ? itemType.description : '';
  }
}

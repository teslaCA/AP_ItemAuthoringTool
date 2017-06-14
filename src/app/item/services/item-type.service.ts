import {Injectable} from "@angular/core";

import {ItemType, ItemTypeCategory} from "../models/item-type";

const itemTypes: ItemType[] = [
  // TODO: Do not delete the commented-out item types; uncomment them as they are implemented
  // {
  //   abbreviation: 'EBSR',
  //   category: ItemTypeCategory.Normal,
  //   code: 'ebsr',
  //   icon: 'fa-list',
  //   name: 'Evidence-Based Select Response'
  // },
  // {
  //   abbreviation: 'EQ',
  //   category: ItemTypeCategory.Normal,
  //   code: 'eq',
  //   icon: 'fa-superscript',
  //   name: 'Equation'
  // },
  // {
  //   abbreviation: 'GI',
  //   category: ItemTypeCategory.Normal,
  //   code: 'gi',
  //   icon: 'fa-bar-chart',
  //   name: 'Grid Item'
  // },
  // {
  //   abbreviation: 'HT',
  //   category: ItemTypeCategory.Normal,
  //   code: 'ht',
  //   icon: 'fa-fire',
  //   name: 'Hot Text'
  // },
  // {
  //   abbreviation: 'MC',
  //   category: ItemTypeCategory.Normal,
  //   code: 'mc',
  //   icon: 'fa-list-ul',
  //   name: 'Multiple Choice'
  // },
  // {
  //   abbreviation: 'MS',
  //   category: ItemTypeCategory.Normal,
  //   code: 'ms',
  //   icon: 'fa-th-list',
  //   name: 'Multiple Select'
  // },
  // {
  //   abbreviation: 'MI',
  //   category: ItemTypeCategory.Normal,
  //   code: 'mi',
  //   icon: 'fa-list-ul',
  //   name: 'Match Interaction'
  // },
  {
    abbreviation: 'SA',
    category: ItemTypeCategory.Normal,
    code: 'sa',
    icon: 'fa-font',
    name: 'Short Answer'
  },
  // {
  //   abbreviation: 'STIM',
  //   category: ItemTypeCategory.OtherResource,
  //   code: 'stim',
  //   icon: 'fa-commenting-o',
  //   name: 'Stimulus'
  // },
  // {
  //   abbreviation: 'TI',
  //   category: ItemTypeCategory.Normal,
  //   code: 'ti',
  //   icon: 'fa-table',
  //   name: 'Table Interaction'
  // },
  // {
  //   abbreviation: 'TUT',
  //   category: ItemTypeCategory.OtherResource,
  //   code: 'tut',
  //   icon: 'fa-question-circle',
  //   name: 'Tutorial'
  // },
  {
    abbreviation: 'WER',
    category: ItemTypeCategory.Normal,
    code: 'wer',
    icon: 'fa-comments',
    name: 'Writing Extended Response'
  },
];

@Injectable()
export class ItemTypeService {
  findNormalItemTypes(): ItemType[] {
    return itemTypes.filter(type => type.category === ItemTypeCategory.Normal);
  }

  findItemType(itemTypeCode: string): ItemType {
    return itemTypes.find(type => type.code === itemTypeCode);
  }
}

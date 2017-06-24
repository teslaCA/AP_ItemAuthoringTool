import {ItemType} from "./item-type";
import {ItemTypeCategory} from "./item-type-category";

export const itemTypes: ItemType[] = [
  // TODO: Do not delete the commented-out item types; uncomment them as they are implemented
  // {
  //   abbreviation: 'EBSR',
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-list',
  //   name: 'Evidence-Based Select Response',
  //   type: 'ebsr',
  // },
  // {
  //   abbreviation: 'EQ',
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-superscript',
  //   name: 'Equation',
  //   type: 'eq',
  // },
  // {
  //   abbreviation: 'GI',
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-bar-chart',
  //   name: 'Grid Item',
  //   type: 'gi',
  // },
  // {
  //   abbreviation: 'HT',
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-fire',
  //   name: 'Hot Text',
  //   type: 'ht',
  // },
  // {
  //   abbreviation: 'MC',
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-list-ul',
  //   name: 'Multiple Choice',
  //   type: 'mc',
  // },
  // {
  //   abbreviation: 'MS',
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-th-list',
  //   name: 'Multiple Select',
  //   type: 'ms',
  // },
  // {
  //   abbreviation: 'MI',
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-list-ul',
  //   name: 'Match Interaction',
  //   type: 'mi',
  // },
  {
    abbreviation: 'SA',
    category: ItemTypeCategory.Normal,
    icon: 'fa-font',
    name: 'Short Answer',
    type: 'sa',
  },
  // {
  //   abbreviation: 'STIM',
  //   category: ItemTypeCategory.OtherResource,
  //   icon: 'fa-commenting-o',
  //   name: 'Stimulus',
  //   type: 'stim',
  // },
  // {
  //   abbreviation: 'TI',
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-table',
  //   name: 'Table Interaction',
  //   type: 'ti',
  // },
  // {
  //   abbreviation: 'TUT',
  //   category: ItemTypeCategory.OtherResource,
  //   icon: 'fa-question-circle',
  //   name: 'Tutorial',
  //   type: 'tut',
  // },
  {
    abbreviation: 'WER',
    category: ItemTypeCategory.Normal,
    icon: 'fa-comments',
    name: 'Writing Extended Response',
    type: 'wer',
  },
];

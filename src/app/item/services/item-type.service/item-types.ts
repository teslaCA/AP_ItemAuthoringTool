import {ItemType} from "./item-type";
import {ItemTypeCategory} from "./item-type-category";

export const itemTypes: ItemType[] = [
  // TODO: Do not delete the commented-out item types; uncomment them as they are implemented
  // {
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-list',
  //   name: 'Evidence-Based Select Response',
  //   code: 'ebsr',
  // },
  // {
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-superscript',
  //   name: 'Equation',
  //   code: 'eq',
  // },
  // {
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-bar-chart',
  //   name: 'Grid Item',
  //   code: 'gi',
  // },
  // {
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-fire',
  //   name: 'Hot Text',
  //   code: 'ht',
  // },
  {
    category: ItemTypeCategory.Normal,
    icon: 'fa-list-ul',
    name: 'Multiple Choice',
    code: 'mc',
  },
  // {
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-th-list',
  //   name: 'Multiple Select',
  //   code: 'ms',
  // },
  // {
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-list-ul',
  //   name: 'Match Interaction',
  //   code: 'mi',
  // },
  {
    category: ItemTypeCategory.Normal,
    icon: 'fa-font',
    name: 'Short Answer',
    code: 'sa',
  },
  {
    category: ItemTypeCategory.Other,
    icon: 'fa-commenting-o',
    name: 'Stimulus',
    code: 'stim',
  },
  // {
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-table',
  //   name: 'Table Interaction',
  //   code: 'ti',
  // },
  // {
  //   category: ItemTypeCategory.Other,
  //   icon: 'fa-question-circle',
  //   name: 'Tutorial',
  //   code: 'tut',
  // },
  {
    category: ItemTypeCategory.Normal,
    icon: 'fa-comments',
    name: 'Writing Extended Response',
    code: 'wer',
  },
];

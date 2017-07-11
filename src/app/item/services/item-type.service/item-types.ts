import {ItemType} from "./item-type";
import {ItemTypeCategory} from "./item-type-category";

export const itemTypes: ItemType[] = [
  // TODO: Do not delete the commented-out item types; uncomment them as they are implemented
  // {
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-list',
  //   name: 'Evidence-Based Select Response',
  //   type: 'ebsr',
  // },
  // {
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-superscript',
  //   name: 'Equation',
  //   type: 'eq',
  // },
  // {
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-bar-chart',
  //   name: 'Grid Item',
  //   type: 'gi',
  // },
  // {
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-fire',
  //   name: 'Hot Text',
  //   type: 'ht',
  // },
  // {
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-list-ul',
  //   name: 'Multiple Choice',
  //   type: 'mc',
  // },
  // {
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-th-list',
  //   name: 'Multiple Select',
  //   type: 'ms',
  // },
  // {
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-list-ul',
  //   name: 'Match Interaction',
  //   type: 'mi',
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
  //   type: 'ti',
  // },
  // {
  //   category: ItemTypeCategory.Other,
  //   icon: 'fa-question-circle',
  //   name: 'Tutorial',
  //   type: 'tut',
  // },
  {
    category: ItemTypeCategory.Normal,
    icon: 'fa-comments',
    name: 'Writing Extended Response',
    code: 'wer',
  },
];

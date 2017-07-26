import {ItemType} from "./item-type";
import {ItemTypeCategory} from "./item-type-category";

export const itemTypes: ItemType[] = [
  // TODO: Do not delete the commented-out item types; uncomment them as they are implemented
  // {
  //   category: ItemTypeCategory.Item,
  //   categoryName: 'Item',
  //   icon: 'fa-list',
  //   name: 'Evidence-Based Select Response',
  //   code: 'ebsr',
  // },
  // {
  //   category: ItemTypeCategory.Item,
  //   categoryName: 'Item',
  //   icon: 'fa-superscript',
  //   name: 'Equation',
  //   code: 'eq',
  // },
  // {
  //   category: ItemTypeCategory.Item,
  //   categoryName: 'Item',
  //   icon: 'fa-bar-chart',
  //   name: 'Grid Item',
  //   code: 'gi',
  // },
  // {
  //   category: ItemTypeCategory.Item,
  //   categoryName: 'Item',
  //   icon: 'fa-fire',
  //   name: 'Hot Text',
  //   code: 'ht',
  // },
  {
    category: ItemTypeCategory.Item,
    categoryName: 'Item',
    icon: 'fa-list-ul',
    name: 'Multiple Choice',
    code: 'mc',
  },
  {
    category: ItemTypeCategory.Item,
    categoryName: 'Item',
    icon: 'fa-th-list',
    name: 'Multiple Select',
    code: 'ms',
  },
  // {
  //   category: ItemTypeCategory.Item,
  //   categoryName: 'Item',
  //   icon: 'fa-list-ul',
  //   name: 'Match Interaction',
  //   code: 'mi',
  // },
  {
    category: ItemTypeCategory.Item,
    categoryName: 'Item',
    icon: 'fa-font',
    name: 'Short Answer',
    code: 'sa',
  },
  {
    category: ItemTypeCategory.Stimulus,
    categoryName: 'Stimulus',
    icon: 'fa-commenting-o',
    name: 'Stimulus',
    code: 'stim',
  },
  // {
  //   category: ItemTypeCategory.Item,
  //   categoryName: 'Item',
  //   icon: 'fa-table',
  //   name: 'Table Interaction',
  //   code: 'ti',
  // },
  {
    category: ItemTypeCategory.Tutorial,
    categoryName: 'Tutorial',
    icon: 'fa-question-circle',
    name: 'Tutorial',
    code: 'tut',
  },
  {
    category: ItemTypeCategory.Item,
    categoryName: 'Item',
    icon: 'fa-comments',
    name: 'Writing Extended Response',
    code: 'wer',
  },
];

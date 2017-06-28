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
  //   supportsHistory: true,
  //   supportsLinkedStimulus: true,
  // },
  // {
  //   abbreviation: 'EQ',
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-superscript',
  //   name: 'Equation',
  //   type: 'eq',
  //   supportsHistory: true,
  //   supportsLinkedStimulus: true,
  // },
  // {
  //   abbreviation: 'GI',
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-bar-chart',
  //   name: 'Grid Item',
  //   type: 'gi',
  //   supportsHistory: true,
  //   supportsLinkedStimulus: true,
  // },
  // {
  //   abbreviation: 'HT',
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-fire',
  //   name: 'Hot Text',
  //   type: 'ht',
  //   supportsHistory: true,
  //   supportsLinkedStimulus: true,
  // },
  // {
  //   abbreviation: 'MC',
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-list-ul',
  //   name: 'Multiple Choice',
  //   type: 'mc',
  //   supportsHistory: true,
  //   supportsLinkedStimulus: true,
  // },
  // {
  //   abbreviation: 'MS',
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-th-list',
  //   name: 'Multiple Select',
  //   type: 'ms',
  //   supportsHistory: true,
  //   supportsLinkedStimulus: true,
  // },
  // {
  //   abbreviation: 'MI',
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-list-ul',
  //   name: 'Match Interaction',
  //   type: 'mi',
  //   supportsHistory: true,
  //   supportsLinkedStimulus: true,
  // },
  {
    abbreviation: 'SA',
    category: ItemTypeCategory.Normal,
    icon: 'fa-font',
    name: 'Short Answer',
    type: 'sa',
    supportsHistory: true,
    supportsLinkedStimulus: true,
  },
  {
    abbreviation: 'STIM',
    category: ItemTypeCategory.Other,
    icon: 'fa-commenting-o',
    name: 'Stimulus',
    type: 'stim',
    supportsHistory: true,
    supportsLinkedStimulus: false,
  },
  // {
  //   abbreviation: 'TI',
  //   category: ItemTypeCategory.Normal,
  //   icon: 'fa-table',
  //   name: 'Table Interaction',
  //   type: 'ti',
  //   supportsHistory: true,
  //   supportsLinkedStimulus: true,
  // },
  // {
  //   abbreviation: 'TUT',
  //   category: ItemTypeCategory.Other,
  //   icon: 'fa-question-circle',
  //   name: 'Tutorial',
  //   type: 'tut',
  //   supportsHistory: true,
  //   supportsLinkedStimulus: false,
  // },
  {
    abbreviation: 'WER',
    category: ItemTypeCategory.Normal,
    icon: 'fa-comments',
    name: 'Writing Extended Response',
    type: 'wer',
    supportsHistory: true,
    supportsLinkedStimulus: true,
  },
];
import {ItemType} from "./item-type";
import {ItemTypeCategory} from "./item-type-category";

export const EBSR: ItemType = {
  category: ItemTypeCategory.Item,
  categoryName: 'Item',
  icon: 'fa-list',
  name: 'Evidence-Based Select Response',
  code: 'EBSR'
};

// export const EQ: ItemType = {
//     category: ItemTypeCategory.Item,
//     categoryName: 'Item',
//     icon: 'fa-superscript',
//     name: 'Equation',
//     code: 'eq'
// };

// export const GI: ItemType = {
//     category: ItemTypeCategory.Item,
//     categoryName: 'Item',
//     icon: 'fa-bar-chart',
//     name: 'Grid Item',
//     code: 'gi'
// };


// export const HT: ItemType = {
//     category: ItemTypeCategory.Item,
//     categoryName: 'Item',
//     icon: 'fa-fire',
//     name: 'Hot Text',
//     code: 'ht'
// };

export const MC: ItemType = {
  category: ItemTypeCategory.Item,
  categoryName: 'Item',
  icon: 'fa-list-ul',
  name: 'Multiple Choice',
  code: 'mc'
};

// export const MI: ItemType = {
//       category: ItemTypeCategory.Item,
//       categoryName: 'Item',
//       icon: 'fa-list-ul',
//       name: 'Match Interaction',
//       code: 'mi'
// };

export const MS: ItemType = {
  category: ItemTypeCategory.Item,
  categoryName: 'Item',
  icon: 'fa-th-list',
  name: 'Multiple Select',
  code: 'ms'
};

export const SA: ItemType = {
  category: ItemTypeCategory.Item,
  categoryName: 'Item',
  icon: 'fa-font',
  name: 'Short Answer',
  code: 'sa'
};


export const STIM: ItemType = {
  category: ItemTypeCategory.Stimulus,
  categoryName: 'Stimulus',
  icon: 'fa-commenting-o',
  name: 'Stimulus',
  code: 'stim'
};

// export const TI: ItemType = {
//       category: ItemTypeCategory.Item,
//       categoryName: 'Item',
//       icon: 'fa-table',
//       name: 'Table Interaction',
//       code: 'ti'
// };

export const TUT: ItemType = {
  category: ItemTypeCategory.Tutorial,
  categoryName: 'Tutorial',
  icon: 'fa-question-circle',
  name: 'Tutorial',
  code: 'tut',
};

export const WER: ItemType = {
  category: ItemTypeCategory.Item,
  categoryName: 'Item',
  icon: 'fa-comments',
  name: 'Writing Extended Response',
  code: 'wer'
};

export const itemTypes: ItemType[] = [
  // TODO: Do not delete the commented-out item types; uncomment them as they are implemented
  EBSR,
  // EQ,
  // GI,
  // HT,
  MC,
  MS,
  // MI,
  SA,
  STIM,
  // TI,
  TUT,
  WER
];

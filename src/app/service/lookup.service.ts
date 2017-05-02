import { Injectable } from '@angular/core';
import { Item } from './item';

const MAIN_ITEMS: Item[] = [
  { id: 10, type: 'ebsr', name: 'Evidence-Based Select Response (EBSR)', icon: 'fa-list'},
  { id: 11, type: 'eq', name: 'Equation (EQ)', icon: 'fa-superscript'},
  { id: 12, type: 'er', name: 'Extended Response (ER)', icon: 'fa-bold'},
  { id: 13, type: 'gi', name: 'Grid Item (GI)', icon: 'fa-bar-chart'},
  { id: 14, type: 'ht', name: 'Hot Text (HT)', icon: 'fa-fire'},
  { id: 15, type: 'mc', name: 'Multiple Choice (MC)', icon: 'fa-list-ul'},
  { id: 16, type: 'ms', name: 'Multiple Select (MS)', icon: 'fa-th-list'},
  { id: 17, type: 'mi', name: 'Match Interaction (MI)', icon: 'fa-list-ul'},
  { id: 18, type: 'sa', name: 'Short Answer (SA)', icon: 'fa-font'},
  { id: 19, type: 'ti', name: 'Table Interaction (TI)', icon: 'fa-table'},
  { id: 20, type: 'wer', name: 'Writing Extended Responses (WER)', icon: 'fa-comments'}
];

const OTHER_ITEMS: Item[] = [
  { id: 30, type: 'stim', name: 'Stimulus (STIM)', icon: 'fa-commenting-o'},
  { id: 31, type: 'tut', name: 'Tutorial (TUT)', icon: 'fa-question-circle '},
];

@Injectable()
export class LookupService {

  constructor() { }

  getMainItemTypes(): Item[] {
    return MAIN_ITEMS;
  }

  getOtherItemTypes(): Item[] {
    return OTHER_ITEMS;
  }

  getItemName(itemType: string): string {

    let selectItem = MAIN_ITEMS.filter(item => item.type === itemType);

    if (selectItem != null) {
      return selectItem[0].name;
    }

    selectItem = OTHER_ITEMS.filter(item => item.type === itemType);

    if (selectItem != null) {
      return selectItem[0].name;
    }

    return '';

  }


}

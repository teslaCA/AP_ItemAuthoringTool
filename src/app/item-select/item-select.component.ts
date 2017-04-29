import { Component, OnInit } from '@angular/core';

export class Item {
  id : number;
  type : string;
  name : string;
  icon : string;
}

const ITEMS: Item[] = [
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

const OTHER : Item[] = [
  { id: 30, type: 'stim', name: 'Stimulus (STIM)', icon: 'fa-commenting-o'},
  { id: 31, type: 'tut', name: 'Tutorial (TUT)', icon: 'fa-question-circle '},
];



@Component({
  selector: 'app-item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.scss']
})
export class ItemSelectComponent implements OnInit {

  items = ITEMS;
  other = OTHER;

  constructor() { }

  ngOnInit() {
  }

}

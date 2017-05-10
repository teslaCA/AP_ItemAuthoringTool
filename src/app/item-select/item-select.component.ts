import { Component, OnInit } from '@angular/core';
import { LookupService} from '../service/lookup.service';
import { Item } from '../model/item';

@Component({
  selector: 'app-item-select',
  templateUrl: './item-select.component.html',
  styleUrls: ['./item-select.component.scss'],
  providers: [ LookupService ]
})
export class ItemSelectComponent implements OnInit {

  items: Item[];
  other: Item[];

  constructor(
      private lookupService: LookupService
  ) { }

  ngOnInit() {

    this.items = this.lookupService.getMainItemTypes();
    this.other = this.lookupService.getOtherItemTypes();
  }

}

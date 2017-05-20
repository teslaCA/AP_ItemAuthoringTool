import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LookupService} from '../../../service/lookup.service';
import {ItemType} from '../../../model/item-type';

@Component({
  selector: 'app-item-select-type',
  templateUrl: './item-select-type.component.html',
  styleUrls: ['./item-select-type.component.less'],
  providers: [LookupService]
})
export class ItemSelectTypeComponent implements OnInit {

  items: ItemType[];
  other: ItemType[];

  constructor(private router: Router,
              private lookupService: LookupService,) {
  }

  ngOnInit() {
    this.items = this.lookupService.getMainItemTypes();
    this.other = this.lookupService.getOtherItemTypes();
  }

  confirmCancel(): void {
      console.log('cancel item select type...');
      this.router.navigateByUrl('/');
  }
}

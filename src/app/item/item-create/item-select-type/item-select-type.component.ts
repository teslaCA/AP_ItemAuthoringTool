import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LookupService} from '../../../service/lookup.service';
import { ItemType } from '../../../model/item-type';
import { ConfirmService } from '../../../confirm-modal/confirm-modal';

@Component({
  selector: 'app-item-select-type',
  templateUrl: './item-select-type.component.html',
  styleUrls: ['./item-select-type.component.scss'],
  providers: [ LookupService ]
})
export class ItemSelectTypeComponent implements OnInit {

  items: ItemType[];
  other: ItemType[];

  constructor(
      private router: Router,
      private lookupService: LookupService,
      private confirmService: ConfirmService
  ) { }

  ngOnInit() {

    this.items = this.lookupService.getMainItemTypes();
    this.other = this.lookupService.getOtherItemTypes();
  }

  confirmCancel(): void {
    this.confirmService.confirm({ title: 'Confirm cancel', message: 'Are you sure you want to cancel?' }).then(
      () => {
        console.log('deleting...');
        // TODO: Call IMS API
        this.router.navigateByUrl('/');

      },
      () => {
        console.log('not deleting...');
      });
  }
}

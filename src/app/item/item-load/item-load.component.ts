import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmService } from '../../confirm-modal/confirm-modal';
import { LookupService } from '../../service/lookup.service';
import { Item } from '../../model/item';

@Component({
  selector: 'app-item-load',
  templateUrl: './item-load.component.html',
  styleUrls: ['./item-load.component.scss'],
  providers: [
    LookupService,
    ConfirmService
  ]
})
export class ItemLoadComponent implements OnInit {
  private _currentItem = new Item();
  private _navBarMessage: string;

  get currentItem(): Item {
    return this._currentItem;
  }
  get navBarMessage(): string {
    return this._navBarMessage;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lookupService: LookupService,
    private confirmService: ConfirmService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this._currentItem.id = params['id'];
      });

    // TODO: retrieve Item from ItemBank via REST Call.
    // This will provide details on the state of the Item
    // and will determine which view to render

    this._currentItem.type = 'sa';

    this._currentItem.name =
      this.lookupService.getItemName(this._currentItem.type);

    this._navBarMessage = 'Create Item ' + this._currentItem.id
       + ' | ' + this._currentItem.name;
  }



  confirmCancel(): void {
    this.confirmService.confirm({ title: 'Confirm cancel', message: 'Are you sure you want to cancel creating this item?' }).then(
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

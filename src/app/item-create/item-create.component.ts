import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LookupService } from '../service/lookup.service';
import { ItemService } from '../service/item.service';
import { Item } from '../model/item';
import { ConfirmService } from '.././confirm-modal/confirm-modal';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss'],
  providers: [
    LookupService,
    ItemService
  ]
})

export class ItemCreateComponent implements OnInit {

  get currentItem(): Item {
    return this._currentItem;
  }

  get navBarMessage(): string {
    return this._navBarMessage;
  }
  get errorMessage(): string {
    return this._errorMessage;
  }

  private _currentItem = new Item();
  private _errorMessage: string;
  private _navBarMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lookupService: LookupService,
    private itemService: ItemService,
    private confirmService: ConfirmService
  ) { }

  ngOnInit() {
    this._navBarMessage = 'Processing...';

    this.route.params
      .subscribe(params => {
        this._currentItem.type = params['type'];
      });

    this.itemService.createItem(this._currentItem.type)
      .subscribe(
        item => this.processSuccess(item),
        error => this._errorMessage = <any>error,
        () => console.log('item-create component completed')
      );
  }

  private processSuccess(item): void {
    this._currentItem = item;

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

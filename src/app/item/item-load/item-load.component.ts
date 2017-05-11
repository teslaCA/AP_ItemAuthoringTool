import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmService } from '../../confirm-modal/confirm-modal';
import { LookupService } from '../../service/lookup.service';
import { Item } from '../../model/item';
import { ItemService } from '../../service/item.service';

@Component({
  selector: 'app-item-load',
  templateUrl: './item-load.component.html',
  styleUrls: ['./item-load.component.scss'],
  providers: [
    LookupService,
    ConfirmService,
    ItemService
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
    private confirmService: ConfirmService,
    private itemService: ItemService
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

  createItem(): void {
    console.log('creating item with id:' + this.currentItem.id);

    try {
      this.itemService.createItem(this.currentItem.id);

      this.router.navigateByUrl('/item/' + this.currentItem.id);
    }
    catch (e) {

    }
  }

  cancelItem(): void {
    this.confirmService.confirm({ title: 'Confirm cancel', message: 'Are you sure you want to cancel creating this item?' })
      .then(
      () => {
        console.log('user selected to cancel item...');

        try {
          this.itemService.deleteItem(this.currentItem.id);

          this.router.navigateByUrl('/');
        }
        catch (e) {

        }

      },
      () => {
        console.log('user delected not to cancel item...');
      });
  }

}

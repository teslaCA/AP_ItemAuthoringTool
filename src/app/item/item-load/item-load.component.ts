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

    this._currentItem.description =
      this.lookupService.getItemDescription(this._currentItem.type);

    this._navBarMessage = 'Create Item ' + this._currentItem.id
       + ' | ' + this._currentItem.description;
  }

  createItem(): void {
    console.log('saving item with id: ' + this.currentItem.id);
    this.currentItem.contents.ENU.stem = 'Test Prompt - Stem';
    this.itemService.saveItem(this.currentItem);

    console.log('creating item with id:' + this.currentItem.id);
    this.itemService.createItem(this.currentItem.id);

    this.router.navigateByUrl('/');

  }


  cancelItem(): void {
    this.confirmService.confirm({ title: 'Confirm cancel', message: 'Are you sure you want to cancel creating this item?' })
      .then(
      () => {
        console.log('deleting item with id:' + this.currentItem.id);
        this.itemService.deleteItem(this.currentItem.id);

        this.router.navigateByUrl('/');

      },
      () => {
        console.log('user delected not to cancel item...');
      });
  }

}

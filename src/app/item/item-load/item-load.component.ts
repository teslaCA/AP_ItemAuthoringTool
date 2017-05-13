import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmService } from '../../confirm-modal/confirm-modal';
import { LookupService } from '../../service/lookup.service';
import { Contents, Item } from '../../model/item';
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
  private _currentItemId: number;
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
        this._currentItemId = params['id'];
      });

    this.itemService.getItem(this._currentItemId)
      .subscribe(
        item => this.processSuccess(item),
        error => this.processError(error),
        () => console.log('item-load component finalized')
      );

  }

  createItem(): void {
    console.log('saving item with id: {}', this.currentItem.id);

    const testContent = new Contents();
    testContent.language = 'ENU';
    testContent.stem = 'Test Prompt - Stem';

    // Temporarily setting value to test save operation
    this._currentItem.contents.push(testContent);

    this.itemService.saveItem(this.currentItem);

    console.log('creating item with id: {}', this.currentItem.id);
    this.itemService.createItem(this.currentItem.id);

    this.router.navigateByUrl('/');

  }

  cancelItem(): void {
    this.confirmService.confirm({ title: 'Confirm cancel', message: 'Are you sure you want to cancel creating this item?' })
      .then(
      () => {
        console.log('deleting item with id: {}', this.currentItem.id);
        this.itemService.deleteItem(this.currentItem.id);

        this.router.navigateByUrl('/');

      },
      () => {
        console.log('item will not be cancelled...');
      });
  }


  private processSuccess(item): void {
    console.log('retrieved item: {}', JSON.stringify(item));

    this._currentItem = item;

    this._currentItem.description =
      this.lookupService.getItemDescription(this._currentItem.type);

    this._navBarMessage = 'Create Item ' + this._currentItem.id
      + ' | ' + this._currentItem.description;
  }

  private processError(error): void {
    console.log(error);
  }

}

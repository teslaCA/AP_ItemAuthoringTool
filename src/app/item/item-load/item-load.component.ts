import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConfirmService } from '../../confirm-modal/confirm-modal';
import { LookupService } from '../../service/lookup.service';
import { Contents, Item } from '../../model/item';
import { ItemService } from '../../service/item.service';
import { ItemLoadSaComponent } from '../item-load-sa/item-load-sa.component';

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
  private _user: any;
  private _loading: boolean;
  private _serviceError: boolean;
  private _errorMessage: string;

  @ViewChild(ItemLoadSaComponent) saComponent;

  get currentItem(): Item {
    return this._currentItem;
  }
  get navBarMessage(): string {
    return this._navBarMessage;
  }

  get user(): any {
    return this._user;
  }

  get loading(): boolean {
    return this._loading;
  }

  get serviceError(): boolean {
    return this._serviceError;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lookupService: LookupService,
    private confirmService: ConfirmService,
    private itemService: ItemService,
    private location: Location
  ) { }

  ngOnInit() {
    this._loading = true;
    this._serviceError = false;

    this.route.params
      .subscribe(params => {
        this._currentItemId = params['id'];
      });

    this.lookupService.getUser()
      .subscribe((res: Response) => {
        this._user = res.json();
      },
      error => console.log(error),
      () => {
        this.itemService.getItem(this._currentItemId)
          .subscribe(
            item => this.onSuccess(item),
            error => this.onError(error),
            () => {
              this._loading = false;
            }
          );
      });
  }

  public createItem(): void {
    console.log('creating item with id: ', this.currentItem.id);

    const testContent = new Contents();
    testContent.language = 'ENU';
    testContent.stem = 'System Generated Stem - Prompt';

    // Temporarily setting value to test save operation
    // this._currentItem.contents.push(testContent);
    //
    // this.itemService.saveScratchPad(this.currentItem);

    this.itemService.createItem(this.currentItem.id);

    this.router.navigateByUrl('/');
  }

  public cancelCreate(): void {
    this.confirmService.confirm({ title: 'Confirm cancel', message: 'Are you sure you want to cancel creating this item?' })
      .then(
      () => {
        console.log('deleting item with id: ', this.currentItem.id);
        this.itemService.deleteScratchPad(this.currentItem.id);

        this.router.navigateByUrl('/');

      },
      () => {
        console.log('item will not be cancelled...');
      });
  }

  public editItem(): void {
    this.itemService.editItem(this._currentItemId)
      .subscribe(
        () => {
          this.router.navigateByUrl('/item-redirect/' + this._currentItemId);
        },
        error => this.onError(error)
      );
  }

  public cancelEdit(): void {
    this.confirmService.confirm({ title: 'Confirm cancel', message: 'Are you sure you want to discard all changes you\'ve made since you\'ve started editing?' })
      .then(
        () => {
          console.log('deleting item with id: ', this.currentItem.id);
          this.itemService.deleteEdit(this.currentItem.id);

          this.router.navigateByUrl('/');
        },
        () => {
          console.log('item will not be cancelled...');
        });
  }

  public commitItem(): void {
    this.confirmService.confirm({ title: 'Confirm cancel', message: 'Reason for changes:' })
      .then(
        () => {
          console.log('committing item with id: ', this.currentItem.id);
          this.itemService.commitItem(this.currentItem.id, 'IAT generated commit');

          this.router.navigateByUrl('/');
        },
        () => {
          console.log('item will not be cancelled...');
        });
  }

  public isCreate(): boolean {
    if (this.user && this.currentItem) {
      if (this.user.username === this.currentItem.beingCreatedBy
        && this.currentItem.beingEditedBy === null) {
        return true;
      }
    }
    return false;
  }

  public isView(): boolean {
    if (this.currentItem) {
      if (this.currentItem.beingCreatedBy === null
        && this.currentItem.beingEditedBy === null) {
        return true;
      }
    }
    return false;
  }

  public isEdit(): boolean {
    if (this.user && this.currentItem) {
      if (this.user.username === this.currentItem.beingEditedBy
         && this.currentItem.beingCreatedBy === null) {
        return true;
      }
    }
    return false;
  }

  public isNotEditable(): boolean {
    if (this.user && this.currentItem) {
      if (this.currentItem.beingCreatedBy === null
          && this.currentItem.beingEditedBy != null
          && this.user.username !== this.currentItem.beingEditedBy) {
        return true;
      }
    }
    return false;
  }

  public goBack(): void {
    this.location.back();
  }




  private onSuccess(item): void {
    console.log('retrieved item: ', JSON.stringify(item));
    let navBarMsgPrefix: string;
    this._currentItem = item;
    this._currentItem.description =
      this.lookupService.getItemDescription(this._currentItem.type);

    if (this.isCreate()) {
      // Item is currently being created by logged in user
      navBarMsgPrefix = 'Create';
    }
    if (this.isView()) {
      navBarMsgPrefix = 'View';
    }
    if (this.isEdit()) {
      navBarMsgPrefix = 'Edit';
    }

    this._navBarMessage = navBarMsgPrefix + ' Item ' + this._currentItem.id
      + ' | ' + this._currentItem.description;
  }

  private onError(error): void {
    this._loading = false;
    this._serviceError = true;

    console.log(error);

    const body = error.json() || '';
    const objMessages = JSON.parse(JSON.stringify(body));

    // TODO: Retrieve multiple errors
    this._errorMessage = objMessages[0].message;




  }

}

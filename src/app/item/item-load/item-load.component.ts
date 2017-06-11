import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ItemService} from "../../core/item.service";
import {ItemLoadSaComponent} from "../item-load-sa/item-load-sa.component";
import {Logger} from "../../core/logger.service";
import {AlertService} from "../../core/alert.service";
import {Item} from "../../model/item/item";
import {ItemTypeService} from "../../core/item-type.service";
import {UserService} from "app/core/user.service";

// TODO: Move stem-related code into separate component (called StemComponent)
// TODO: Move exemplar response-related code into separate component (called ExemplarResponsesComponent)
// TODO: Move nav bar message-related code into separate component (called ItemHeaderComponent)

@Component({
  selector: 'app-item-load',
  templateUrl: './item-load.component.html',
  styleUrls: ['./item-load.component.less']
})
// TODO: This class has too many fields - clear sign it needs to be factored into multiple classes
export class ItemLoadComponent implements OnInit {

  private currentItemId: string;

  commitForm: FormGroup;

  private _currentItem: Item;
  get currentItem(): Item {
    return this._currentItem;
  }

  private _navBarMessage: string;
  get navBarMessage(): string {
    return this._navBarMessage;
  }

  private _user: any; // TODO: Strongly type (looks like only the username is used so consider changing this field to a non-nullable string "_currentUsername")
  get user(): any {
    return this._user;
  }

  private _loading: boolean;
  get loading(): boolean {
    return this._loading;
  }

  private _serviceError: boolean;
  get serviceError(): boolean {
    return this._serviceError;
  }

  private _errorMessage: string;
  get errorMessage(): string {
    return this._errorMessage;
  }

  @ViewChild(ItemLoadSaComponent) saItemComponent;

  constructor(private logger: Logger,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private itemService: ItemService,
              private itemTypeService: ItemTypeService,
              private alertService: AlertService,
              public fb: FormBuilder) {
    this.commitForm = this.fb.group({
      commitMsg: ''
    });
  }

  ngOnInit() {
    this._loading = true;
    this._serviceError = false;

    this.route.params
      .subscribe(params => {
        this.currentItemId = params['id'];
      });

    this.logger.debug('id: ' + this.currentItemId);

    this.userService.findCurrentUser()
      .subscribe(
        (res: Response) => {
          this._user = res.json();
        },
        error => this.logger.error(error),
        () => {
          this.itemService.findItem(this.currentItemId)
            .subscribe(
              item => this.onSuccess(item),
              error => this.onError(error),
              () => {
                this._loading = false;
              }
            );
        });

  }

  createItem(): void {
    // TODO: This is bad - shouldn't use switch, shouldn't be hardcoded to SA, clean this up
    // Get the item to be created
    let item: Item;
    switch (this.currentItem.type) {
      case 'sa' : {
        item = this.saItemComponent.currentItem();
        break;
      }
    }
    if (!item || !item.id) {
      this.logger.error('Item was not properly loaded from subcomponent. Generate error');
      return;
    }

    // TODO: Replace with processing overlay
    this.alertService.processing(
      'Creating Item',
      'Your item is being created.');
    this.itemService
      .commitItemCreate(item)
      .subscribe(
        () => {
          this.alertService.success(
            'Item Created',
            'The item has been successfully created and added to the item bank.');

          // Route user to dashboard
          this.router.navigateByUrl(`/?action=create&id=${item.id}`);
        },
        e => {
          this.alertService.error(
            'Error Creating Item',
            `An error was encountered trying to create your item.  Reason:\n\n${e}`);
        },
        () => {
          // TODO: Remove processing overlay
        }
      );
  }

  cancelCreate(): void {
    // TODO: Replace with processing overlay
    this.alertService.processing(
      'Cancelling Creation',
      'Your item is being removed.');
    this.itemService
      .rollbackItemCreate(this.currentItem.id)
      .subscribe(
        () => {
          this.alertService.success(
            'Creation Cancelled',
            'The item you were creating has been successfully removed.');

          // Route user to dashboard
          this.router.navigateByUrl('/');
        },
        e => {
          this.alertService.error(
            'Error Cancelling Creation',
            `An error was encountered trying to cancel the creation of your item.  Reason:\n\n${e}`);
        },
        () => {
          // TODO: Remove processing overlay
        }
      );
  }

  editItem(): void {
    // TODO: Replace with processing overlay
    this.alertService.processing(
      'Editing Item',
      'Your item is being opened for editing.');
    this.itemService
      .beginItemEdit(this.currentItemId)
      .subscribe(
        () => {
          this.alertService.success(
            'Editing Item',
            'Your item has been successfully opened for editing.');

          // Route user to item
          this.router.navigateByUrl('/item-redirect/' + this.currentItemId);
        },
        e => {
          // TODO: Replace this call with an error alert
          this.onError(e);
        },
        () => {
          // TODO: Remove processing overlay
        }
      );
  }

  cancelEdit(): void {
    // TODO: Replace with processing overlay
    this.alertService.processing(
      'Discarding Changes',
      'Your changes to the item are being discarded.');
    this.itemService
      .rollbackItemEdit(this.currentItem.id)
      .subscribe(
        () => {
          this.alertService.success(
            'Changes Discarded',
            'Your changes to the item have been discarded.');

          // Route user to dashboard
          this.router.navigateByUrl(`/?action=commit&id=${this.currentItem.id}`);
        },
        e => {
          this.alertService.error(
            'Error Discarding Changes',
            `An error was encountered trying to discard your changes to the item.  Reason:\n\n${e}`);
        },
        () => {
          // TODO: Remove processing overlay
        }
      );
  }

  commitItem(): void {
    // TODO: This is bad - shouldn't use switch, shouldn't be hardcoded to SA, clean this up
    // Get the item to be created
    let item: Item;
    switch (this.currentItem.type) {
      case 'sa' : {
        item = this.saItemComponent.currentItem();
        break;
      }
    }
    if (!item || !item.id) {
      this.logger.error('Item was not properly loaded from subcomponent. Generate error');
      return;
    }

    // Get the commit message
    let message = this.commitForm.get('commitMsg').value;
    if (message === '') {
      message = 'IAT item commit';
    }

    // TODO: Replace with processing overlay
    this.alertService.processing(
      'Saving Changes',
      'Your changes to the item are being saved.');
    this.itemService
      .commitItemEdit(item, message)
      .subscribe(
        () => {
          this.alertService.success(
            'Changes Saved',
            'Your changes to the item have been saved to the item bank.');

          // Route user to dashboard
          this.router.navigateByUrl(`/?action=commit&id=${item.id}`);
        },
        e => {
          this.alertService.error(
            'Error Saving Changes',
            `An error was encountered trying to save your changes to the item.  Reason:\n\n${e}`);
        },
        () => {
          // TODO: Remove processing overlay
        }
      );
  }

  isCreate(): boolean {
    if (this._user && this.currentItem) {
      if (this._user.username === this.currentItem.beingCreatedBy
        && this.currentItem.beingEditedBy === null) {
        return true;
      }
    }
    return false;
  }

  isView(): boolean {
    if (this.currentItem) {
      if (this.currentItem.beingCreatedBy === null
        && this.currentItem.beingEditedBy === null) {
        return true;
      }
    }
    return false;
  }

  isEdit(): boolean {
    if (this._user && this.currentItem) {
      if (this._user.username === this.currentItem.beingEditedBy
        && this.currentItem.beingCreatedBy === null) {
        return true;
      }
    }
    return false;
  }

  // TODO: Why isn't this the negation of isEdit?
  isNotEditable(): boolean {
    if (this._user && this.currentItem) {
      if (this.currentItem.beingCreatedBy === null
        && this.currentItem.beingEditedBy != null
        && this._user.username !== this.currentItem.beingEditedBy) {
        return true;
      }
    }
    return false;
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }

  private onSuccess(item: Item): void {
    this.logger.debug('retrieved item: ' + JSON.stringify(item));
    let navBarMsgPrefix: string;
    this._currentItem = item;

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

    // Set header
    this._navBarMessage = navBarMsgPrefix + ' Item ' + this.currentItem.id
      + ' | ' + this.itemTypeService.findItemTypeDescription(this.currentItem.type);
  }

  private onError(error): void {
    this._loading = false;
    this._serviceError = true;

    this.logger.error('Error Status: ' + error.status);

    switch (error.status) {
      case 400:
      case 404: {
        this._errorMessage = this.getErrorMessages(error);
        break;
      }
      case 500: {
        this._errorMessage = 'Internal Server Error';
        break;
      }
      default: {
        this._errorMessage = 'Unknown Error';
      }
    }
  }

  // TODO: Function named with "get" prefix shouldn't take parameter (and if it doesn't take parameter it should be a property getter instead of a regular method).  In this case this function should be renamed to something like "toErrorString"
  private getErrorMessages(error: any): string {
    const body = error.json() || '';
    const objMessages = JSON.parse(JSON.stringify(body));

    let msgs = '';

    if (objMessages instanceof Array) {
      for (const msg of objMessages) {
        msgs += msg.message;
      }
    }

    return msgs;
  }
}

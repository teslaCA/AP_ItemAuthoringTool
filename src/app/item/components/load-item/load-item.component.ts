import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../../services/item/item.service";
import {LoadSaItemComponent} from "../load-sa-item/load-sa-item.component";
import {Logger} from "../../../core/services/logger/logger.service";
import {AlertService} from "../../../core/services/alert/alert.service";
import {Item} from "../../services/item/item";
import {ItemTypeService} from "../../services/item-type/item-type.service";
import {UserService} from "app/core/services/user/user.service";
import {ItemType} from "../../services/item-type/item-type";
import {LoadWerItemComponent} from "../load-wer-item/load-wer-item.component";
import {User} from "../../../core/services/user/user";

// TODO: Move nav bar message-related code into separate component (called ItemHeaderComponent)

@Component({
  selector: 'load-item',
  templateUrl: './load-item.component.html',
  styleUrls: ['./load-item.component.less']
})
export class LoadItemComponent implements OnInit {
  private currentItemId: string;
  commitForm: FormGroup;
  currentItem: Item;
  mode: string;
  currentItemType: ItemType;
  currentUser: User;
  serviceError = false;
  errorMessage: string;

  @ViewChild(LoadSaItemComponent) saItemComponent;
  @ViewChild(LoadWerItemComponent) werItemComponent;

  constructor(private logger: Logger,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private itemService: ItemService,
              private itemTypeService: ItemTypeService,
              private alertService: AlertService,
              public fb: FormBuilder) {
    this.commitForm = this.fb.group({
      commitMsg: [null, Validators.required]
    });
  }

  ngOnInit() {
    // TODO: Use observable operators to chain / run-in-parallel these calls
    // TODO: Add error handling for all calls (currently only findItem failure is handled)
    // Extract item ID from route
    this.route.params
      .subscribe(
        params => {
          this.currentItemId = params['id'];

          // Load current user
          this.userService.findCurrentUser()
            .subscribe(
              (user: User) => {
                this.currentUser = user;

                // Load current item
                this.itemService.findItem(this.currentItemId)
                  .subscribe(
                    item => {
                      this.currentItem = item;

                      if (this.isCreate()) {
                        // Item is currently being created by logged in user
                        this.mode = 'Create';
                      }
                      if (this.isView()) {
                        this.mode = 'View';
                      }
                      if (this.isEdit()) {
                        this.mode = 'Edit';
                      }

                      // Load current item's type
                      this.itemTypeService
                        .findItemType(this.currentItem.type)
                        .subscribe(
                          (itemType: ItemType) => {
                            this.currentItemType = itemType;
                          });
                    },
                    error => {
                      this.serviceError = true;

                      switch (error.status) {
                        case 400:
                        case 404: {
                          const body = error.json() || '';
                          const objMessages = JSON.parse(JSON.stringify(body));

                          let msgs = '';

                          if (objMessages instanceof Array) {
                            for (const msg of objMessages) {
                              msgs += msg.message;
                            }
                          }

                          this.errorMessage = msgs;
                          break;
                        }
                        default: {
                          this.logger.error('Error Status: ' + error.status);
                          this.errorMessage = 'Internal server error';
                          break;
                        }
                      }
                    });
              });
        });
  }

  commitCreateItemTransaction(): void {
    // Get the item to be created
    let item: Item;
    switch (this.currentItem.type) {
      case 'sa':
        item = this.saItemComponent.currentItem();
        break;

      case 'wer':
        item = this.werItemComponent.currentItem();
        break;

      default:
        throw new Error(`Cannot create unknown item type ${this.currentItem.type}`);
    }

    // Commit the transaction
    this.itemService
      .commitTransaction(item.createTransaction.transactionId, item, "Finished creation")
      .subscribe(
        () => {
          this.alertService.success(
            'Item Created',
            'The item has been successfully created and added to the item bank.');

          // Route user to dashboard
          this.router.navigateByUrl(`/?action=create&id=${item.id}`);
        }
      );
  }

  commitEditItemTransaction(): void {
    // Get the item to be created
    let item: Item;
    switch (this.currentItem.type) {
      case 'sa':
        item = this.saItemComponent.currentItem();
        break;

      case 'wer':
        item = this.werItemComponent.currentItem();
        break;

      default:
        throw new Error(`Cannot commit changes to item of unknown type ${this.currentItem.type}`);
    }

    // Get the commit message
    const message = this.commitForm.get('commitMsg').value.trim();

    // Save the changes
    this.itemService
      .commitTransaction(item.editTransaction.transactionId, item, message)
      .subscribe(
        () => {
          this.alertService.success(
            'Changes Committed',
            'Your changes to the item have been committed to the item bank.');

          // Route user to dashboard
          this.router.navigateByUrl(`/?action=commit&id=${item.id}`);
        }
      );
  }

  rollbackCreateItemTransaction(): void {
    this.itemService
      .rollbackTransaction(this.currentItem.createTransaction.transactionId, this.currentItem.id)
      .subscribe(
        () => {
          this.alertService.success(
            'Creation Cancelled',
            'The item you were creating has been successfully removed.');

          // Route user to dashboard
          this.router.navigateByUrl('/');
        }
      );
  }

  rollbackEditItemTransaction(): void {
    this.itemService
      .rollbackTransaction(this.currentItem.editTransaction.transactionId, this.currentItem.id)
      .subscribe(
        () => {
          this.alertService.success(
            'Changes Discarded',
            'Your changes to the item have been discarded.');

          // Route user to dashboard
          this.router.navigateByUrl(`/?action=commit&id=${this.currentItem.id}`);
        }
      );
  }

  beginEditItemTransaction(): void {
    this.itemService
      .beginEditTransaction(this.currentItemId, "Began edit")
      .subscribe(
        () => {
          // Route user to item
          this.router.navigateByUrl('/item-redirect/' + this.currentItemId);
        }
      );
  }

  isCreate(): boolean {
    if (this.currentUser && this.currentItem) {
      if (this.currentItem.createTransaction
        && this.currentUser.username === this.currentItem.createTransaction.username
        && this.currentItem.editTransaction === null) {
        return true;
      }
    }
    return false;
  }

  isView(): boolean {
    if (this.currentItem) {
      if (this.currentItem.createTransaction === null
        && this.currentItem.editTransaction === null) {
        return true;
      }
    }
    return false;
  }

  isEdit(): boolean {
    if (this.currentUser && this.currentItem) {
      if (this.currentItem.editTransaction
        && this.currentUser.username === this.currentItem.editTransaction.username
        && this.currentItem.createTransaction === null) {
        return true;
      }
    }
    return false;
  }

  // TODO: Why isn't this the negation of isEdit?
  isNotEditable(): boolean {
    if (this.currentUser && this.currentItem) {
      if (this.currentItem.createTransaction === null
        && this.currentItem.editTransaction != null
        && this.currentUser.username !== this.currentItem.editTransaction.username) {
        return true;
      }
    }
    return false;
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }
}

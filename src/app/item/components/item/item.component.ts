import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../../services/item/item.service";
import {SaItemComponent} from "./item-types/sa-item/sa-item.component";
import {Logger} from "../../../core/services/logger/logger.service";
import {AlertService} from "../../../core/services/alert/alert.service";
import {Item} from "../../services/item/item";
import {ItemTypeService} from "../../services/item-type/item-type.service";
import {UserService} from "app/core/services/user/user.service";
import {ItemType} from "../../services/item-type/item-type";
import {WerItemComponent} from "./item-types/wer-item/wer-item.component";
import {User} from "../../../core/services/user/user";

// TODO: Move nav bar message-related code into separate component (called ItemHeaderComponent)
@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less']
})
export class ItemComponent implements OnInit {
  currentUser: User;
  item: Item;
  itemType: ItemType;
  commitForm: FormGroup;
  isError = false;
  errorMessage: string;
  @ViewChild(SaItemComponent) saItemComponent;
  @ViewChild(WerItemComponent) werItemComponent;

  get mode(): string {
    if (this.isCreate()) {
      return "Create";
    }
    else if (this.isEdit()) {
      return "Edit";
    }
    else if (this.isView()) {
      return "View";
    }
    else {
      return "";
    }
  }

  get formItem(): Item {
    switch (this.item.type) {
      case 'sa':
        return this.saItemComponent.item;

      case 'wer':
        return this.werItemComponent.item;

      default:
        throw new Error(`Cannot commit changes to item of unknown type ${this.item.type}`);
    }
  }

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
          const itemId = params['id'];

          // Load current user
          this.userService.findCurrentUser()
            .subscribe(
              (user: User) => {
                this.currentUser = user;

                // Load current item
                this.itemService.findItem(itemId)
                  .subscribe(
                    item => {
                      this.item = item;

                      // Load current item's type
                      this.itemTypeService
                        .findItemType(this.item.type)
                        .subscribe(
                          (itemType: ItemType) => {
                            this.itemType = itemType;
                          });
                    },
                    error => {
                      this.isError = true;

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

  commitCreateTransaction(): void {
    this.commitTransaction(
      'Finished item creation',
      'Item Created',
      'The item has been successfully created and added to the item bank.',
      `/?action=create&id=${this.formItem.id}`);
  }

  commitEditTransaction(): void {
    this.commitTransaction(
      this.commitForm.get('commitMsg').value.trim(),
      'Changes Committed',
      'Your changes to the item have been committed to the item bank.',
      `/?action=commit&id=${this.formItem.id}`);
  }

  rollbackCreateTransaction(): void {
    this.rollbackTransaction(
      'Creation Cancelled',
      'The item you were creating has been successfully removed.',
      '/');
  }

  rollbackEditTransaction(): void {
    this.rollbackTransaction(
      'Changes Discarded',
      'Your changes to the item have been discarded.',
      `/?action=commit&id=${this.item.id}`)
  }

  beginEditTransaction(): void {
    this.itemService
      .beginEditTransaction(this.item.id, "Began edit")
      .subscribe(
        () => {
          this.router.navigateByUrl(`/item-redirect/${this.item.id}`);
        });
  }

  // TODO: Clean up
  isCreate(): boolean {
    return !!(this.currentUser
    && this.item
    && this.item.createTransaction
    && this.currentUser.username === this.item.createTransaction.username
    && this.item.editTransaction === null);

  }

  // TODO: Clean up
  isView(): boolean {
    return this.item
      && this.item.createTransaction === null
      && this.item.editTransaction === null;
  }

  // TODO: Clean up
  isEdit(): boolean {
    return !!(this.currentUser
    && this.item
    && this.item.editTransaction
    && this.currentUser.username === this.item.editTransaction.username
    && this.item.createTransaction === null);

  }

  // TODO: Clean up
  isNotEditable(): boolean {
    return this.currentUser
      && this.item
      && this.item.createTransaction === null
      && this.item.editTransaction !== null
      && this.currentUser.username !== this.item.editTransaction.username;
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }

  private commitTransaction(commitMessage: string, alertTitle: string, alertMessage: string, successUrl: string) {
    this.itemService
      .commitTransaction(this.formItem.currentTransaction.transactionId, this.formItem, commitMessage)
      .subscribe(
        () => {
          this.alertService.success(alertTitle, alertMessage);
          this.router.navigateByUrl(successUrl);
        }
      );
  }

  private rollbackTransaction(alertTitle: string, alertMessage: string, successUrl: string): void {
    this.itemService
      .rollbackTransaction(this.item.currentTransaction.transactionId, this.item.id)
      .subscribe(
        () => {
          this.alertService.success(alertTitle, alertMessage);
          this.router.navigateByUrl(successUrl);
        }
      );
  }
}

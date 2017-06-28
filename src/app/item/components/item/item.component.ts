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
import {StimItemComponent} from "./item-types/stim-item/stim-item.component";

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
  isLoading: boolean;
  isError = false;
  errorMessage: string;
  @ViewChild(SaItemComponent) saItemComponent;
  @ViewChild(StimItemComponent) stimItemComponent;
  @ViewChild(WerItemComponent) werItemComponent;

  get formItem(): Item {
    switch (this.item.type) {
      case 'sa':
        return this.saItemComponent.item;
      case 'stim':
        return this.stimItemComponent.item;
      case 'wer':
        return this.werItemComponent.item;
      default:
        throw new Error(`Cannot commit changes to item of unknown type ${this.item.type}`);
    }
  }

  get mode(): string {
    if (this.isBeingCreatedByCurrentUser) {
      return "Create";
    }
    if (this.isBeingEditedByCurrentUser) {
      return "Edit";
    }
    if (this.isBeingViewedByCurrentUser) {
      return "View";
    }
    return "";
  }

  get isBeingCreatedByCurrentUser(): boolean {
    return this.item.isBeingCreatedBy(this.currentUser.username);
  }

  get isBeingEditedByCurrentUser(): boolean {
    return this.item.isBeingEditedBy(this.currentUser.username);
  }

  get isBeingViewedByCurrentUser(): boolean {
    return !this.isBeingCreatedByCurrentUser
      && !this.isBeingEditedByCurrentUser;
  }

  get isBeingEditedByAnotherUser(): boolean {
    return this.item.isBeingEdited
      && !this.item.isBeingEditedBy(this.currentUser.username);
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
    // TODO: Use observable operators to chain / run-in-parallel these calls (also enhance busy service to handle parallel operations)
    // TODO: Add error handling for all calls (currently only findItem failure is handled)
    this.isLoading = true;

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

                            this.isLoading = false;
                          });
                    },
                    error => {
                      this.isError = true;
                      this.isLoading = false;

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
      `/?action=commit&id=${this.item.id}`);
  }

  beginEditTransaction(): void {
    this.itemService
      .beginEditTransaction(this.item.id, "Began edit")
      .subscribe(
        () => {
          this.router.navigateByUrl(`/item-redirect/${this.item.id}`);
        });
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

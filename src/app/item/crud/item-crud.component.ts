import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../services/item.service/item.service";
import {AlertService} from "../../core/alert.service/alert.service";
import {Item} from "../services/item.service/item";
import {ItemTypeService} from "../services/item-type.service/item-type.service";
import {UserService} from "app/core/user.service/user.service";
import {ItemType} from "../services/item-type.service/item-type";
import {User} from "../../core/user.service/user";
import {HttpUtility} from "../../core/http-utility.service/http-utility";
import {ItemDetailsComponent} from "./details/item-details.component";
import {itemTypes} from "../services/item-type.service/item-types";

// TODO: Move nav bar message-related code into separate component (called ItemHeaderComponent)
@Component({
  selector: 'item-crud',
  templateUrl: './item-crud.component.html',
  styleUrls: ['./item-crud.component.less']
})
export class ItemCrudComponent implements OnInit {
  currentUser: User;
  item: Item;
  itemType: ItemType;
  commitForm: FormGroup;  // TODO: Rename to "form"
  isLoading: boolean;
  isError = false;
  errorMessage: string;
  @ViewChild(ItemDetailsComponent) itemDetailsComponent;

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

  get isStimulusItem(): boolean {
    return this.item.type === 'stim';
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private itemService: ItemService,
              private itemTypeService: ItemTypeService,
              private alertService: AlertService,
              public fb: FormBuilder,
              public httpUtility: HttpUtility) {
    this.commitForm = this.fb.group({
      commitMsg: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.loadItem();
  }

  commitCreateTransaction(): void {
    this.commitTransaction(
      'Finished item creation',
      'Item Created',
      'The item has been successfully created and added to the item bank.',
      `/?action=create&id=${this.itemDetailsComponent.currentItem.id}`);
  }

  commitEditTransaction(): void {
    this.commitTransaction(
      this.commitForm.get('commitMsg').value.trim(),
      'Changes Committed',
      'Your changes to the item have been committed to the item bank.',
      `/?action=commit&id=${this.itemDetailsComponent.currentItem.id}`);
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
          this.loadItem();
        });
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }

  private loadItem() {
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
                this.itemService.findItem(itemId, false /* showAlertOnError */)
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
                      this.errorMessage = this.httpUtility.getErrorMessageText(error);
                    });
              });
        });
  }

  private commitTransaction(commitMessage: string, alertTitle: string, alertMessage: string, successUrl: string) {
    this.itemService
      .commitTransaction(
        this.itemDetailsComponent.currentItem.currentTransaction.transactionId,
        this.itemDetailsComponent.currentItem,
        commitMessage)
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

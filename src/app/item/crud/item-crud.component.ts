import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../services/item.service/item.service";
import {AlertService} from "../../core/alert.service/alert.service";
import {Item} from "../services/item.service/models/base/item";
import {UserService} from "app/core/user.service/user.service";
import {User} from "../../core/user.service/user";
import {HttpUtility} from "../../core/http-utility.service/http-utility";
import {ItemDetailsComponent} from "./details/item-details.component";
import {ItemContext} from "../services/item.service/models/base/item-context";

@Component({
  selector: 'item-crud',
  templateUrl: './item-crud.component.html',
  styleUrls: ['./item-crud.component.less']
})
export class ItemCrudComponent implements OnInit {
  currentUser: User;
  itemContext: ItemContext;
  form: FormGroup;
  isLoading: boolean;
  isError = false;
  errorMessage: string;
  selectedTab: string;
  @ViewChild(ItemDetailsComponent) itemDetailsComponent;

  get mode(): string {
    if (this.isCurrentUserCreating) {
      return "Creating";
    }
    if (this.isCurrentUserEditing) {
      return "Editing";
    }
    if (this.isBeingViewedByCurrentUser) {
      return "Viewing";
    }
    return "";
  }

  canCurrentUserBeginEditing(section: string): boolean {
    return !this.itemContext.isSectionBeingEdited(section)
      && !this.itemContext.isAnySectionBeingEditedBy(this.currentUser.userName);
  }

  isCurrentUserCreatingOrEditing(section: string): boolean {
    return this.isCurrentUserCreating
      || this.isCurrentUserEditing(section);
  }

  isCurrentUserEditing(section: string): boolean {
    return this.itemContext.isSectionBeingEditedBy(section, this.currentUser.userName);
  }

  isAnotherUserEditing(section: string): boolean {
    return this.itemContext.isSectionBeingEdited(section)
      && !this.itemContext.isSectionBeingEditedBy(section, this.currentUser.userName);
  }

  getUserNameEditing(section: string): string {
    return this.itemContext.getSectionEditorUserName(section);
  }

  get isCurrentUserCreating(): boolean {
    return this.itemContext.isBeingCreatedBy(this.currentUser.userName);
  }

  get isBeingViewedByCurrentUser(): boolean {
    // TODO: IAT-666 - Replace with section-specific editing logic
    // return !this.isBeingCreatedByCurrentUser
    //   && !this.isBeingEditedByCurrentUser;
    return false;
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private itemService: ItemService,
              private alertService: AlertService,
              private formBuilder: FormBuilder,
              private httpUtility: HttpUtility) {
    this.form = this.formBuilder.group({
      commitMsg: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        params => {
          // Extract item ID and selected Tab from route
          this.loadItem(params['id'], params['tab']);
        });
  }

  commitCreateTransaction(): void {
    this.commitTransaction(
      'Finished creation.',
      `${this.itemContext.item.itemType.categoryName} Created`,
      `The ${this.itemContext.item.itemType.categoryName} has been successfully created and added to the item bank.`,
      `/?id=${this.itemDetailsComponent.currentItem.id}`);
  }

  commitEditTransaction(): void {
    this.commitTransaction(
      this.form.get('commitMsg').value ? this.form.get('commitMsg').value.trim() : 'Made a change.',
      'Changes Committed',
      `Your changes to the ${this.itemContext.item.itemType.categoryName} have been committed to the item bank.`,
      `/?id=${this.itemDetailsComponent.currentItem.id}`);
  }

  rollbackCreateTransaction(): void {
    this.rollbackTransaction(
      'Creation Cancelled',
      `The ${this.itemContext.item.itemType.categoryName} you were creating has been successfully removed.`,
      '/');
  }

  rollbackEditTransaction(): void {
    this.rollbackTransaction(
      'Changes Discarded',
      `Your changes to the ${this.itemContext.item.itemType.categoryName} have been discarded.`,
      `/?id=${this.itemContext.item.id}`);
  }

  beginEditTransaction(section: string): void {
    this.itemService
      .beginEditTransaction(this.itemContext.item.id, section,"Began edit")
      .subscribe(
        () => {
          this.loadItem(this.itemContext.item.id, this.selectedTab);
        });
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }

  onTabChanged(selectedTab: string): void {
    this.selectedTab = selectedTab;
  }

  private loadItem(itemId: string, selectTab: string) {
    // TODO: Use observable operators to chain / run-in-parallel these calls (also enhance busy service to handle parallel operations)
    // TODO: Add error handling for all calls (currently only findItem failure is handled)
    this.isLoading = true;
    this.selectedTab = selectTab;

    // Load current user
    this.userService.findCurrentUser()
      .subscribe(
        (user: User) => {
          this.currentUser = user;

          // Load current item
          this.itemService.findItem(itemId, false /* showAlertOnError */)
            .subscribe(
              item => {
                this.itemContext = item;
                this.isLoading = false;
              },
              error => {
                this.isError = true;
                this.isLoading = false;
                this.errorMessage = this.httpUtility.getErrorMessageText(error);
              });
        });
  }

  private commitTransaction(commitMessage: string, alertTitle: string, alertMessage: string, successUrl: string) {
    this.itemService
      .commitTransaction(this.itemDetailsComponent.currentItem, commitMessage)
      .subscribe(
        () => {
          this.alertService.success(alertTitle, alertMessage);
          this.router.navigateByUrl(successUrl);
        }
      );
  }

  private rollbackTransaction(alertTitle: string, alertMessage: string, successUrl: string): void {
    this.itemService
      .rollbackTransaction(this.itemContext.item.id)
      .subscribe(
        () => {
          this.alertService.success(alertTitle, alertMessage);
          this.router.navigateByUrl(successUrl);
        }
      );
  }
}

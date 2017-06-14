import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ItemService} from "../../services/item.service";
import {LoadSaItemComponent} from "../load-sa-item/load-sa-item.component";
import {Logger} from "../../../core/logger.service";
import {AlertService} from "../../../core/alert.service";
import {Item} from "../../models/item";
import {ItemTypeService} from "../../services/item-type.service";
import {UserService} from "app/core/user.service";
import {BusyService} from "../../../core/busy.service/busy.service";
import {ItemType} from "../../models/item-type";
import {LoadWerItemComponent} from "../load-wer-item/load-wer-item.component";

// TODO: Move stem-related code into separate component (called StemComponent)
// TODO: Move exemplar response-related code into separate component (called ExemplarResponsesComponent)
// TODO: Move nav bar message-related code into separate component (called ItemHeaderComponent)

@Component({
  selector: 'load-item',
  templateUrl: './load-item.component.html',
  styleUrls: ['./load-item.component.less']
})
// TODO: This class has too many fields - clear sign it needs to be factored into multiple classes
export class LoadItemComponent implements OnInit {
  private currentItemId: string;
  commitForm: FormGroup;
  currentItem: Item;
  mode: string;
  currentItemType: ItemType;
  user: any; // TODO: Strongly type (looks like only the username is used so consider changing this field to a non-nullable string "_currentUsername")
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
              private busyService: BusyService,
              public fb: FormBuilder) {
    this.commitForm = this.fb.group({
      commitMsg: [null, Validators.required]
    });
  }

  ngOnInit() {
    // Extract item ID from route
    this.route.params
      .subscribe(params => {
        this.currentItemId = params['id'];
      });

    // Load current user
    this.logger.debug("Loading current user");
    this.busyService.show("Loading Current User");
    this.userService.findCurrentUser()
      .subscribe(
        (response: Response) => {
          this.logger.debug("Current user successfully loaded");
          this.user = response.json();

          // Load current item
          this.logger.debug(`Loading item having ID ${this.currentItemId}`);
          this.busyService.show(`Loading Item`);
          this.itemService.findItem(this.currentItemId)
            .subscribe(
              item => {
                this.logger.debug(`Successfully loaded item ${JSON.stringify(item)}`);
                this.busyService.hide();
                this.onSuccess(item);
              },
              error => {
                this.logger.error(`Failed to load item having ID ${this.currentItemId}, error ${JSON.stringify(error)}`);
                this.busyService.hide();
                this.alertService.error("Error loading item", `There was an error loading the the item having ID ${this.currentItemId}`);
                this.onError(error);
              }
            );
        },
        error => {
          this.logger.error(`Failed to load current user, error ${JSON.stringify(error)}`);
          this.busyService.hide();
          this.alertService.error("Error loading current user", "There was an error loading the current user");
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
      case 'wer' : {
        item = this.werItemComponent.currentItem();
        break;
      }
    }
    if (!item || !item.id) {
      this.logger.error('Item was not properly loaded from subcomponent. Generate error');
      return;
    }

    this.busyService.show('Creating Item');
    this.itemService
      .commitItemCreate(item)
      .subscribe(
        () => {
          this.busyService.hide();
          this.alertService.success(
            'Item Created',
            'The item has been successfully created and added to the item bank.');

          // Route user to dashboard
          this.router.navigateByUrl(`/?action=create&id=${item.id}`);
        },
        e => {
          this.busyService.hide();
          this.alertService.error(
            'Error Creating Item',
            `An error was encountered trying to create your item.  Reason:\n\n${e}`);
        }
      );
  }

  cancelCreate(): void {
    this.busyService.show('Cancelling Creation');
    this.itemService
      .rollbackItemCreate(this.currentItem.id)
      .subscribe(
        () => {
          this.busyService.hide();
          this.alertService.success(
            'Creation Cancelled',
            'The item you were creating has been successfully removed.');

          // Route user to dashboard
          this.router.navigateByUrl('/');
        },
        e => {
          this.busyService.hide();
          this.alertService.error(
            'Error Cancelling Creation',
            `An error was encountered trying to cancel the creation of your item.  Reason:\n\n${e}`);
        }
      );
  }

  editItem(): void {
    this.busyService.show('Opening Item');
    this.itemService
      .beginItemEdit(this.currentItemId)
      .subscribe(
        () => {
          this.busyService.hide();

          // Route user to item
          this.router.navigateByUrl('/item-redirect/' + this.currentItemId);
        },
        e => {
          this.busyService.hide();
          this.alertService.error(
            'Error Editing Item',
            `An error was encountered trying to open the item for editing.  Reason:\n\n${e}`);
          this.onError(e);
        }
      );
  }

  cancelEdit(): void {
    this.busyService.show('Discarding Changes');
    this.itemService
      .rollbackItemEdit(this.currentItem.id)
      .subscribe(
        () => {
          this.busyService.hide();
          this.alertService.success(
            'Changes Discarded',
            'Your changes to the item have been discarded.');

          // Route user to dashboard
          this.router.navigateByUrl(`/?action=commit&id=${this.currentItem.id}`);
        },
        e => {
          this.busyService.hide();
          this.alertService.error(
            'Error Discarding Changes',
            `An error was encountered trying to discard your changes to the item.  Reason:\n\n${e}`);
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
      case 'wer' : {
        item = this.werItemComponent.currentItem();
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

    // Save the changes
    this.busyService.show('Committing Changes');
    this.itemService
      .commitItemEdit(item, message)
      .subscribe(
        () => {
          this.busyService.hide();
          this.alertService.success(
            'Changes Committed',
            'Your changes to the item have been committed to the item bank.');

          // Route user to dashboard
          this.router.navigateByUrl(`/?action=commit&id=${item.id}`);
        },
        e => {
          this.busyService.hide();
          this.alertService.error(
            'Error Committing Changes',
            `An error was encountered trying to save your changes to the item.  Reason:\n\n${e}`);
        }
      );
  }

  isCreate(): boolean {
    if (this.user && this.currentItem) {
      if (this.user.username === this.currentItem.beingCreatedBy
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
    if (this.user && this.currentItem) {
      if (this.user.username === this.currentItem.beingEditedBy
        && this.currentItem.beingCreatedBy === null) {
        return true;
      }
    }
    return false;
  }

  // TODO: Why isn't this the negation of isEdit?
  isNotEditable(): boolean {
    if (this.user && this.currentItem) {
      if (this.currentItem.beingCreatedBy === null
        && this.currentItem.beingEditedBy != null
        && this.user.username !== this.currentItem.beingEditedBy) {
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

    // Set header
    this.currentItemType = this.itemTypeService.findItemType(this.currentItem.type);
  }

  // TODO: Remove this function - it is called in two places but only one the call from the "load" function can get 4xx errors; the call from the "edit" function will only get 500's - we need to not show an error alert when a 4xx is received
  private onError(error): void {
    this.serviceError = true;

    switch (error.status) {
      case 400:
      case 404: {
        this.errorMessage = LoadItemComponent.getErrorMessages(error);
        break;
      }
      default: {
        this.logger.error('Error Status: ' + error.status);
        this.errorMessage = 'Internal server error';
        break;
      }
    }
  }

  // TODO: Function named with "get" prefix shouldn't take parameter (and if it doesn't take parameter it should be a property getter instead of a regular method).  In this case this function should be renamed to something like "toErrorString"
  private static getErrorMessages(error: any): string {
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

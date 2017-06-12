/*
 * Copyright 2017 Regents of the University of California.
 *
 * Licensed under the Educational Community License, Version 2.0 (the "license");
 * you may not use this file except in compliance with the License. You may
 * obtain a copy of the license at
 *
 * https://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {isNumeric} from "rxjs/util/isNumeric";
import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LookupService} from "../../service/lookup.service";
import {ItemService} from "../../service/item.service";
import {ItemLoadSaComponent} from "../item-load-sa/item-load-sa.component";
import {Logger} from "../../service/logger.service";
import {AlertService} from "../../service/alert.service";
import {Item} from "../../model/item/item";

// TODO: Move stem-related code into separate component (called StemComponent)
// TODO: Move exemplar response-related code into separate component (called ExemplarResponsesComponent)
// TODO: Move nav bar message-related code into separate component (called ItemHeaderComponent)

@Component({
  selector: 'app-item-load',
  templateUrl: './item-load.component.html',
  styleUrls: ['./item-load.component.less'],
  providers: [
    LookupService,
    ItemService
  ]
})
// TODO: This class has too many fields - clear sign it needs to be factored into multiple classes
export class ItemLoadComponent implements OnInit {

  private currentItemId: string;

  private _radioModel: string;
  get radioModel(): string {
    return this._radioModel;
  }

  set radioModel(value: string) {
    this._radioModel = value;
  }

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
              private lookupService: LookupService,
              private itemService: ItemService,
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

    this.lookupService.getUser()
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
    let itemCommit: Item;

    switch (this.currentItem.type) {
      case 'sa' : {
        itemCommit = this.saItemComponent.currentItem();
        break;
      }
    }
    this.logger.debug('committing item: ' + JSON.stringify(itemCommit));
    // TODO: What if this fails?  Need to not redirect to / on failure
    if (itemCommit.id !== undefined) {
      // TODO: Take out this alert after this section of code no longer always redirects to /
      this.alertService.processing('Creating Item', `Your item is being created.`);

      this.itemService.commitItemCreate(itemCommit);
    } else {
      this.logger.error('Item was not properly loaded from subcomponent. Generate error');
    }
    this.router.navigateByUrl('/?action=create&id=' + itemCommit.id);
  }

  cancelCreate(): void {
    // TODO: Take out this alert after this section of code no longer always redirects to /
    this.alertService.processing('Cancelling Creation', `Your item is being removed.`);

    // TODO: What if this fails?  Need to not redirect to / on failure
    this.itemService.rollbackItemCreate(this.currentItem.id);
    this.router.navigateByUrl('/');
  }

  editItem(): void {
    this.itemService.beginItemEdit(this.currentItemId)
      .subscribe(
        () => {
          this.router.navigateByUrl('/item-redirect/' + this.currentItemId);
        },
        error => this.onError(error)
      );
  }

  cancelEdit(): void {
    // TODO: Take out this alert after this section of code no longer always redirects to /
    this.alertService.processing('Discarding Changes', `Your changes to the item are being discarded.`);

    // TODO: What if this fails?  Need to not redirect to / on failure
    this.itemService.rollbackItemEdit(this.currentItem.id);
    this.router.navigateByUrl('/');
  }

  commitItem(): void {
    let itemCommit: Item;
    switch (this.currentItem.type) {
      case 'sa' : {
        itemCommit = this.saItemComponent.currentItem();
        break;
      }
    }
    this.logger.debug('committing item: ' + JSON.stringify(itemCommit));

    let commitMsg = this.commitForm.get('commitMsg').value;
    if (commitMsg === '') {
      commitMsg = 'IAT item commit';
    }
    this.logger.debug('commit message: ' + commitMsg);

    // TODO: Take out this alert after this section of code no longer always redirects to /
    this.alertService.processing('Saving Changes', `Your changes to the item are being saved.`);

    // TODO: What if this fails?  Need to not redirect to / on failure
    if (itemCommit.id !== undefined) {
      this.itemService.commitItemEdit(itemCommit, commitMsg);
    } else {
      this.logger.error('Item was not properly loaded from subcomponent. Generate error');
    }
    this.router.navigateByUrl('/?action=commit&id=' + itemCommit.id);
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

    this._navBarMessage = navBarMsgPrefix + ' Item ' + this.currentItem.id
      + ' | ' + this.lookupService.getItemDescription(this.currentItem.type);
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

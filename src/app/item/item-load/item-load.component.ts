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
import {LookupService} from "../../service/lookup.service";
import {Item} from "../../model/item";
import {ItemService} from "../../service/item.service";
import {ItemLoadSaComponent} from "../item-load-sa/item-load-sa.component";
import {Logger} from "../../utility/logger";
import {AlertService} from "../../service/alert.service";

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
  private currentItemId: number;

  private _currentItem = new Item();
  get item(): Item {
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
              private alertService: AlertService) {
  }

  ngOnInit() {
    this._loading = true;
    this._serviceError = false;

    this.route.params
      .subscribe(params => {
        this.currentItemId = params['id'];
      });

    this.logger.debug('id: ' + this.currentItemId);

    if (isNumeric(this.currentItemId)) {
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
    } else {
      this._loading = false;
      this.router.navigateByUrl('/unavailable');
    }
  }

  createItem(): void {
    let itemCommit = new Item();

    switch (this.item.type) {
      case 'sa' : {
        itemCommit = this.saItemComponent.currentItem();
        break;
      }
    }
    this.logger.debug('committing item: ' + JSON.stringify(itemCommit));
    // TODO: What if this fails?  Need to not redirect to / on failure
    if (itemCommit.id !== undefined) {
      // TODO: Take out this alert after this section of code no longer always redirects to /
      this.alertService.processing(`Your item is being created.`);

      this.itemService.commitItemCreate(itemCommit);
    } else {
      this.logger.error('Item was not properly loaded from subcomponent. Generate error');
    }
    this.router.navigateByUrl('/');
  }

  cancelCreate(): void {
    // TODO: What if this fails?  Need to not redirect to / on failure
    this.itemService.rollbackItemCreate(this.item.id);
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
    // TODO: What if this fails?  Need to not redirect to / on failure
    this.itemService.rollbackItemEdit(this.item.id);
    this.router.navigateByUrl('/');
  }

  commitItem(): void {
    let itemCommit = new Item();
    switch (this.item.type) {
      case 'sa' : {
        itemCommit = this.saItemComponent.currentItem();
        break;
      }
    }
    this.logger.debug('committing item: ' + JSON.stringify(itemCommit));
    // TODO: What if this fails?  Need to not redirect to / on failure
    if (itemCommit.id !== undefined) {
      this.itemService.commitItemEdit(itemCommit, 'IAT generated commit');
    } else {
      this.logger.error('Item was not properly loaded from subcomponent. Generate error');
    }
    this.router.navigateByUrl('/');
  }

  isCreate(): boolean {
    if (this._user && this.item) {
      if (this._user.username === this.item.beingCreatedBy
        && this.item.beingEditedBy === null) {
        return true;
      }
    }
    return false;
  }

  isView(): boolean {
    if (this.item) {
      if (this.item.beingCreatedBy === null
        && this.item.beingEditedBy === null) {
        return true;
      }
    }
    return false;
  }

  isEdit(): boolean {
    if (this._user && this.item) {
      if (this._user.username === this.item.beingEditedBy
        && this.item.beingCreatedBy === null) {
        return true;
      }
    }
    return false;
  }

  // TODO: Why isn't this the negation of isEdit?
  isNotEditable(): boolean {
    if (this._user && this.item) {
      if (this.item.beingCreatedBy === null
        && this.item.beingEditedBy != null
        && this._user.username !== this.item.beingEditedBy) {
        return true;
      }
    }
    return false;
  }

  goHome(): void {
    this.router.navigateByUrl('/');
  }

  private onSuccess(item): void {
    this.logger.debug('retrieved item: ' + JSON.stringify(item));
    let navBarMsgPrefix: string;
    this._currentItem = item;
    this._currentItem.description = this.lookupService.getItemDescription(this.item.type);

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

    this._navBarMessage = navBarMsgPrefix + ' Item ' + this.item.id
      + ' | ' + this._currentItem.description;
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

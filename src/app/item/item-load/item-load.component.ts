import { isNumeric } from 'rxjs/util/isNumeric';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LookupService } from '../../service/lookup.service';
import { Item } from '../../model/item';
import { ItemService } from '../../service/item.service';
import { ItemLoadSaComponent } from '../item-load-sa/item-load-sa.component';

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
// TODO: Does this need to implement AfterViewInit?  Implementation of that method does nothing (see later)
export class ItemLoadComponent implements OnInit, AfterViewInit {
    private _currentItemId: number;
    private _currentItem = new Item();
    private _navBarMessage: string;
    private _user: any; // TODO: Strongly type (looks like you only use username so consider changing this field to a non-nullable string "_currentUsername")
    private _loading: boolean;
    private _serviceError: boolean;
    private _errorMessage: string;

    @ViewChild(ItemLoadSaComponent) saItemComponent;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private lookupService: LookupService,
                private itemService: ItemService) {
    }

    ngOnInit() {
        this._loading = true;
        this._serviceError = false;

        this.route.params
            .subscribe(params => {
                this._currentItemId = params['id'];
            });

        console.log('id: ' + this._currentItemId);

        if (isNumeric(this._currentItemId)) {
            this.lookupService.getUser()
                .subscribe(
                    (res: Response) => {
                        this._user = res.json();
                    },
                    error => console.log(error),
                    () => {
                        this.itemService.findItem(this._currentItemId)
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

    // TODO: Is this needed?  If not remove
    ngAfterViewInit() {}

    public createItem(): void {
      console.log('creating item: ' + JSON.stringify(this.saItemComponent.getUpdatedItem()));
      // TODO: What if this fails?  Need to not redirect to / on failure
      this.itemService.commitItemCreate(this.saItemComponent.getUpdatedItem());
      this.router.navigateByUrl('/');
    }

    public cancelCreate(): void {
      // TODO: What if this fails?  Need to not redirect to / on failure
        this.itemService.rollbackItemCreate(this.currentItem.id);
        this.router.navigateByUrl('/');
    }

    public editItem(): void {
        this.itemService.beginItemEdit(this._currentItemId)
            .subscribe(
                () => {
                    this.router.navigateByUrl('/item-redirect/' + this._currentItemId);
                },
                error => this.onError(error)
            );
    }

    public cancelEdit(): void {
      // TODO: What if this fails?  Need to not redirect to / on failure
        this.itemService.rollbackItemEdit(this.currentItem.id);
        this.router.navigateByUrl('/');
    }

    public commitItem(): void {
      console.log('committing item: ' + JSON.stringify(this.saItemComponent.getUpdatedItem()));
      // TODO: What if this fails?  Need to not redirect to / on failure
      this.itemService.commitItemEdit(this.saItemComponent.getUpdatedItem(), 'IAT generated commit');
      this.router.navigateByUrl('/');
    }

    public isCreate(): boolean {
        if (this._user && this._currentItem) {
            if (this._user.username === this._currentItem.beingCreatedBy
                && this._currentItem.beingEditedBy === null) {
                return true;
            }
        }
        return false;
    }

    public isView(): boolean {
        if (this._currentItem) {
            if (this._currentItem.beingCreatedBy === null
                && this._currentItem.beingEditedBy === null) {
                return true;
            }
        }
        return false;
    }

    public isEdit(): boolean {
        if (this._user && this._currentItem) {
            if (this._user.username === this._currentItem.beingEditedBy
                && this._currentItem.beingCreatedBy === null) {
                return true;
            }
        }
        return false;
    }

    // TODO: Why isn't this the negation of isEdit?
    public isNotEditable(): boolean {
        if (this._user && this._currentItem) {
            if (this._currentItem.beingCreatedBy === null
                && this._currentItem.beingEditedBy != null
                && this._user.username !== this._currentItem.beingEditedBy) {
                return true;
            }
        }
        return false;
    }

    public goHome(): void {
      this.router.navigateByUrl('/');
    }

    private onSuccess(item): void {
        console.log('retrieved item: ', JSON.stringify(item));
        let navBarMsgPrefix: string;
        this._currentItem = item;
        this._currentItem.description = this.lookupService.getItemDescription(this._currentItem.type);

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

        console.log('Error Status: ' + error.status);
        // console.log('Error Object: ' + error);

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

    private getErrorMessages(error: any): string {
      const body = error.json() || '';
      const objMessages = JSON.parse(JSON.stringify(body));

      let msgs: string;

      if (objMessages instanceof Array) {
        for (const msg of objMessages) {
          msgs += msg.message;
        }
      }

      return msgs;
    }

    // ------------------------------------------------------

    get currentItem(): Item {
        return this._currentItem;
    }

    // TODO: Is this used?  If not remove
    get navBarMessage(): string {
        return this._navBarMessage;
    }

    // TODO: Strongly type
    get user(): any {
        return this._user;
    }

  // TODO: Is this used?  If not remove
    get loading(): boolean {
        return this._loading;
    }

  // TODO: Is this used?  If not remove
    get serviceError(): boolean {
        return this._serviceError;
    }

  // TODO: Is this used?  If not remove
    get errorMessage(): string {
        return this._errorMessage;
    }
}

import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import 'rxjs/add/observable/fromPromise';

import {Logger} from "./logger.service";
import {AlertService} from "./alert.service";
import {Item} from "app/model/item/item";

@Injectable()
export class ItemService {
  private static serviceUrl = '/api/ims/v1/items';
  private static requestOptions = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

  // TODO: Remove injection of AlertService once all public methods return Observables (the caller will use the AlertService to alert user to success or failure)
  constructor(private logger: Logger,
              private http: Http,
              private alertService: AlertService) {
  }

  //---------------------------------------------------------------------------
  // Item lookup
  //---------------------------------------------------------------------------
  // Return the item with the given ID
  findItem(itemId: string): Observable<Item> {
    const url = ItemService.serviceUrl + '/' + itemId;

    this.logger.debug(`Finding item with ID ${itemId}: ${url}`);

    return this.http
      .get(ItemService.serviceUrl + '/' + itemId, ItemService.requestOptions)
      .map(res => ItemService.extractJson(res))
      .catch(err => this.handleError(err));
  }

  //---------------------------------------------------------------------------
  // Item create
  //---------------------------------------------------------------------------
  // Begin creating an item (creates a scratchpad to which updates will be saved)
  beginItemCreate(itemType: string): Observable<Item> {
    const url = ItemService.serviceUrl + '/begin';

    this.logger.debug(`Beginning creation of item type ${itemType}: ${url}`);

    return this.http
      .post(url, {'type': itemType}, ItemService.requestOptions)
      .map(res => ItemService.extractJson(res))
      .catch(err => this.handleError(err));
  }

  // Commit the creation of the item (the item will become available in the system)
  commitItemCreate(item: Item): Observable<void> {
    const url = `${ItemService.serviceUrl}/${item.id}/commit`;
    return this.http
      .post(url, {item: item}, ItemService.requestOptions)
      .map(_ => null)
      .catch(this.handleError);
  }

  // Rollback the creation of the item (the item will be removed entirely)
  rollbackItemCreate(itemId: string): Observable<void> {
    const url = `${ItemService.serviceUrl}/${itemId}/rollback`;
    return this.http
      .post(url, null, ItemService.requestOptions)
      .map(_ => null)
      .catch(e => this.handleError(e));
  }

  //---------------------------------------------------------------------------
  // Item edit
  //---------------------------------------------------------------------------
  // Begin editing an item (creates a scratchpad to which updates will be saved)
  beginItemEdit(itemId: string): Observable<boolean> {
    const url = ItemService.serviceUrl + '/' + itemId + '/begin';

    this.logger.debug(`Beginning edit of item with ID ${itemId}: ${url}`);

    return this.http
      .put(url, null, ItemService.requestOptions)
      .map(() => {
        return new Observable<boolean>();
      })
      .catch(err => this.handleError(err));
  }

  // Commit the editing of the item (the changes to the item will become available in the system)
  // TODO: Change to return Observable so caller can decide what to do on success/failure
  commitItemEdit(item: Item, commitMessage: string): void {
    const url = ItemService.serviceUrl + '/' + item.id + '/commit';

    this.logger.debug(`Committing edit of item ${JSON.stringify(item)}: ${url}`);

    this.http
      .put(url, {item: item, message: commitMessage}, ItemService.requestOptions)
      .subscribe(
        (response: Response) => {
          this.alertService.success('Changes Saved', 'Your edits to the item have been saved.');

          this.logger.debug('put ' + url + ' operation successful');
        },
        e => {
          this.alertService.error('Error Saving Changes', `Your edits to the item failed to be saved.  Reason:\n\n${e}`);

          this.handleError(e);
        });
  }

  // Rollback the editing of the item (the changes made to the item since editing began will be removed)
  // TODO: Change to return Observable so caller can decide what to do on success/failure
  rollbackItemEdit(itemId: string): void {
    const url = ItemService.serviceUrl + '/' + itemId + '/rollback';

    this.logger.debug(`Rolling back edit of item with ID ${itemId}: ${url}`);

    this.http
      .put(url, null, ItemService.requestOptions)
      .subscribe(
        (response: Response) => {
          this.alertService.success('Changes Discarded', 'Your edits to the item have been successfully discarded.');

          this.logger.debug('put ' + url + ' operation successful');
        },
        e => {
          this.alertService.error('Error Discarding Changes', `An error was encountered trying to discard your edits to the item.  Reason:\n\n${e}`);

          this.handleError(e);
        });
  }

  //---------------------------------------------------------------------------
  // Item save
  //---------------------------------------------------------------------------
  // Save changes to the item (update the scratchpad)
  // TODO: Change to return Observable so caller can decide what to do on success/failure
  saveChanges(item: Item): void {
    const url = ItemService.serviceUrl + '/' + item.id + '/save';

    this.logger.debug(`Saving item ${JSON.stringify(item)}: ${url}`);

    this.http
      .post(url, JSON.stringify(item), ItemService.requestOptions)
      .subscribe(
        (response: Response) => {
          this.logger.debug('post ' + url + ' operation successful');
        },
        e => {
          this.handleError(e);
        });
  }

  //---------------------------------------------------------------------------
  // Helpers
  //---------------------------------------------------------------------------
  private static extractJson(res: Response): any | {} {
    return res.json() || {};
  }

  // TODO: Can this be removed once all public methods return Observables instead of handling errors internally?
  private handleError(error: Response | any): any {
    let message: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      message = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      message = error.message ? error.message : error.toString();
    }
    this.logger.error('Item Service: ' + message);
    return Observable.throw(error);
  }
}

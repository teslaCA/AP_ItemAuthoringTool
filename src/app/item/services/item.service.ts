import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/fromPromise";

import {Logger} from "../../core/logger.service";
import {Item} from "app/item/models/item";

@Injectable()
export class ItemService {
  private static serviceUrl = '/api/ims/v1/items';
  private static requestOptions = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

  constructor(private logger: Logger,
              private http: Http) {
  }

  //---------------------------------------------------------------------------
  // Item history
  //---------------------------------------------------------------------------
  // Returns a list of ItemHistory objects
  getItemHistory(itemId: string): Observable<any> {   // TODO: Strongly type
    const url = ItemService.serviceUrl + '/' + itemId + '/history';

    this.logger.debug(`Getting history for item ID ${itemId}: ${url}`);

    return this.http
      .get(url, ItemService.requestOptions)
      .map(res => ItemService.extractJson(res))
      .catch(err => this.handleError(err));
  }

  //---------------------------------------------------------------------------
  // Item search
  //---------------------------------------------------------------------------
  // Return the item with the given ID
  findItem(itemId: string): Observable<Item> {
    const url = `${ItemService.serviceUrl}/${encodeURIComponent(itemId.trim())}`;
    return this.http
      .get(url, ItemService.requestOptions)
      .map(response => ItemService.extractJson(response))
      .catch(error => this.handleError(error));
  }

  //---------------------------------------------------------------------------
  // Item create
  //---------------------------------------------------------------------------
  // Begin creating an item (creates a scratchpad to which updates will be saved)
  beginItemCreate(itemType: string): Observable<Item> {
    const url = `${ItemService.serviceUrl}/begin`;
    return this.http
      .post(url, {'type': itemType}, ItemService.requestOptions)
      .map(response => ItemService.extractJson(response))
      .catch(error => this.handleError(error));
  }

  // Commit the creation of the item (the item will become available in the system)
  commitItemCreate(item: Item): Observable<void> {
    const url = `${ItemService.serviceUrl}/${item.id}/commit`;
    return this.http
      .post(url, {item: item}, ItemService.requestOptions)
      .map(_ => null)
      .catch(error => this.handleError(error));
  }

  // Rollback the creation of the item (the item will be removed entirely)
  rollbackItemCreate(itemId: string): Observable<void> {
    const url = `${ItemService.serviceUrl}/${itemId}/rollback`;
    return this.http
      .post(url, null, ItemService.requestOptions)
      .map(_ => null)
      .catch(error => this.handleError(error));
  }

  //---------------------------------------------------------------------------
  // Item edit
  //---------------------------------------------------------------------------
  // Begin editing an item (creates a scratchpad to which updates will be saved)
  beginItemEdit(itemId: string): Observable<void> {
    const url = `${ItemService.serviceUrl}/${itemId}/begin`;
    return this.http
      .put(url, null, ItemService.requestOptions)
      .map(_ => null)
      .catch(error => this.handleError(error));
  }

  // Commit the editing of the item (the changes to the item will become available in the system)
  commitItemEdit(item: Item, commitMessage: string): Observable<void> {
    const url = `${ItemService.serviceUrl}/${item.id}/commit`;
    return this.http
      .put(url, {item: item, message: commitMessage}, ItemService.requestOptions)
      .map(_ => null)
      .catch(error => this.handleError(error));
  }

  // Rollback the editing of the item (the changes made to the item since editing began will be removed)
  rollbackItemEdit(itemId: string): Observable<void> {
    const url = `${ItemService.serviceUrl}/${itemId}/rollback`;
    return this.http
      .put(url, null, ItemService.requestOptions)
      .map(_ => null)
      .catch(error => this.handleError(error));
  }

  //---------------------------------------------------------------------------
  // Item save
  //---------------------------------------------------------------------------
  // Save changes to the item (update the scratchpad)
  // TODO: Combine saveCreateChanges and saveEditChanges into one method and make corresponding change in the back-end service
  saveCreateChanges(item: Item): Observable<void> {
    const url = `${ItemService.serviceUrl}/${item.id}/save`;
    return this.http
      .post(url, JSON.stringify(item), ItemService.requestOptions)
      .map(_ => null)
      .catch(error => this.handleError(error));
  }

  // TODO: Combine saveCreateChanges and saveEditChanges into one method and make corresponding change in the back-end service
  saveEditChanges(item: Item): Observable<void> {
    const url = `${ItemService.serviceUrl}/${item.id}/save`;
    return this.http
      .put(url, JSON.stringify(item), ItemService.requestOptions)
      .map(_ => null)
      .catch(error => this.handleError(error));
  }

  //---------------------------------------------------------------------------
  // Helpers
  //---------------------------------------------------------------------------
  private static extractJson(res: Response): any | {} {
    return res.json() || {};
  }

  private handleError(error: Response | any): any {
    let message: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      message = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      message = error.message ? error.message : error.toString();
    }
    this.logger.error(message);
    return Observable.throw(error);
  }
}

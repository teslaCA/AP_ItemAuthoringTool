import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/fromPromise";

import {Logger} from "../../core/services/logger/logger.service";
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
    // TODO: Create true List<ItemHistory> returned from this method, currently it's returning an Object
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
    // TODO: Create true Item returned from this method, currently it's returning an Object
    const url = `${ItemService.serviceUrl}/${encodeURIComponent(itemId.trim())}`;
    return this.http
      .get(url, ItemService.requestOptions)
      .map(response => ItemService.extractJson(response))
      .catch(error => this.handleError(error));
  }

  //---------------------------------------------------------------------------
  // Item creation & editing
  //---------------------------------------------------------------------------
  // Begin a create item transaction (creates a repo & scratchpad to which updates will be saved)
  beginCreateTransaction(itemType: string, message: string): Observable<Item> {
    // TODO: Create true Item returned from this method, currently it's returning an Object
    const url = `${ItemService.serviceUrl}/transactions`;
    return this.http
      .post(url, {'type': itemType, message: message}, ItemService.requestOptions)
      .map(response => ItemService.extractJson(response) as Item)
      .catch(error => this.handleError(error));
  }

  // Begin an edit item transaction (creates a scratchpad to which updates will be saved)
  beginEditTransaction(itemId: string, message: string): Observable<Item> {
    // TODO: Create true Item returned from this method, currently it's returning an Object
    const url = `${ItemService.serviceUrl}/${itemId}/transactions`;
    return this.http
      .post(url, {message: message}, ItemService.requestOptions)
      .map(response => ItemService.extractJson(response) as Item)
      .catch(error => this.handleError(error));
  }

  // Save changes to the transaction (update the scratchpad)
  updateTransaction(item: Item, transactionId: string, message: string): Observable<void> {
    const url = `${ItemService.serviceUrl}/${item.id}/transactions/${transactionId}`;
    return this.http
      .patch(url, {item: item, message: message}, ItemService.requestOptions)
      .map(_ => null)
      .catch(error => this.handleError(error));
  }

  // Commit the transaction (merges the scratchpad to master)
  commitTransaction(item: Item, transactionId: string, message: string): Observable<void> {
    const url = `${ItemService.serviceUrl}/${item.id}/transactions/${transactionId}`;
    return this.http
      .put(url, {item: item, message: message}, ItemService.requestOptions)
      .map(_ => null)
      .catch(error => this.handleError(error));
  }

  // Rollback the transaction (discards the scratchpad (and the repo if this was a create transaction))
  rollbackTransaction(itemId: string, transactionId: string): Observable<void> {
    const url = `${ItemService.serviceUrl}/${itemId}/transactions/${transactionId}`;
    return this.http
      .delete(url)
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

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/fromPromise";

import {Logger} from "../../../core/services/logger/logger.service";
import {Item} from "app/item/services/item/item";
import {HttpUtility} from "../../../core/util/http-utility";

@Injectable()
export class ItemService {
  private static serviceUrl = '/api/ims/v1/items';

  constructor(private http: Http,
              private logger: Logger) {
  }

  //---------------------------------------------------------------------------
  // Item history
  //---------------------------------------------------------------------------
  // TODO: Move this method to a new item-history service (move corresponding model)
  // Returns a list of ItemHistory objects
  getItemHistory(itemId: string): Observable<any> {   // TODO: Strongly type
                                                      // TODO: Create true List<ItemHistory> returned from this method, currently it's returning an Object
    const url = ItemService.serviceUrl + '/' + itemId + '/history';

    this.logger.debug(`Getting history for item ID ${itemId}: ${url}`);

    return this.http
      .get(url, HttpUtility.jsonRequestOptions)
      .map(response => response.json())
      .catch(error => HttpUtility.logAndThrowError(this.logger, error));
  }

  //---------------------------------------------------------------------------
  // Item search
  //---------------------------------------------------------------------------
  // Return the item with the given ID
  findItem(itemId: string): Observable<Item> {
    // TODO: Create true Item returned from this method, currently it's returning an Object
    const url = `${ItemService.serviceUrl}/${encodeURIComponent(itemId.trim())}`;
    return this.http
      .get(url, HttpUtility.jsonRequestOptions)
      .map(response => response.json())
      .catch(error => HttpUtility.logAndThrowError(this.logger, error));
  }

  //---------------------------------------------------------------------------
  // Item creation & editing
  //---------------------------------------------------------------------------
  // Begin a create item transaction (creates a repo & scratchpad to which updates will be saved)
  beginCreateTransaction(itemType: string, message: string): Observable<Item> {
    // TODO: Create true Item returned from this method, currently it's returning an Object
    const url = `${ItemService.serviceUrl}/transactions`;
    return this.http
      .post(url, {'type': itemType, message: message}, HttpUtility.jsonRequestOptions)
      .map(response => response.json())
      .catch(error => HttpUtility.logAndThrowError(this.logger, error));
  }

  // Begin an edit item transaction (creates a scratchpad to which updates will be saved)
  beginEditTransaction(itemId: string, message: string): Observable<Item> {
    // TODO: Create true Item returned from this method, currently it's returning an Object
    const url = `${ItemService.serviceUrl}/${itemId}/transactions`;
    return this.http
      .post(url, {message: message}, HttpUtility.jsonRequestOptions)
      .map(response => response.json())
      .catch(error => HttpUtility.logAndThrowError(this.logger, error));
  }

  // Save changes to the transaction (update the scratchpad)
  updateTransaction(item: Item, transactionId: string, message: string): Observable<void> {
    const url = `${ItemService.serviceUrl}/${item.id}/transactions/${transactionId}`;
    return this.http
      .patch(url, {item: item, message: message}, HttpUtility.jsonRequestOptions)
      .map(_ => null)
      .catch(error => HttpUtility.logAndThrowError(this.logger, error));
  }

  // Commit the transaction (merges the scratchpad to master)
  commitTransaction(item: Item, transactionId: string, message: string): Observable<void> {
    const url = `${ItemService.serviceUrl}/${item.id}/transactions/${transactionId}`;
    return this.http
      .put(url, {item: item, message: message}, HttpUtility.jsonRequestOptions)
      .map(_ => null)
      .catch(error => HttpUtility.logAndThrowError(this.logger, error));
  }

  // Rollback the transaction (discards the scratchpad (and the repo if this was a create transaction))
  rollbackTransaction(itemId: string, transactionId: string): Observable<void> {
    const url = `${ItemService.serviceUrl}/${itemId}/transactions/${transactionId}`;
    return this.http
      .delete(url)
      .map(_ => null)
      .catch(error => HttpUtility.logAndThrowError(this.logger, error));
  }
}

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

  /**
   * Return the item with the given ID
   * @param itemId ID of the item to return
   * @returns Observable containing the item with the given ID
   */
  findItem(itemId: string): Observable<Item> {
    this.logger.debug(`Finding item having ID ${itemId}`);

    // TODO: Map JSON returned from HTTP request to model object
    const url = `${ItemService.serviceUrl}/${encodeURIComponent(itemId.trim())}`;
    return this.http
      .get(url, HttpUtility.jsonRequestOptions)
      .map(response => response.json())
      .catch(error => HttpUtility.logAndThrowError(this.logger, error));
  }

  /**
   * Begin a "create item" transaction.  This creates a repo and scratchpad branch in the item bank.
   * Changes made to this item will be written to the scratchpad branch.
   * @param itemType type of the item to create
   * @param message to be captured as the commit message in the repo
   * @returns Observable containing the item in its initial state
   */
  beginCreateTransaction(itemType: string, message: string): Observable<Item> {
    this.logger.debug(`Beginning "create item" transaction for item of type "${itemType}" with message "${message}"`);

    // TODO: Map JSON returned from HTTP request to model object
    const url = `${ItemService.serviceUrl}/transactions`;
    return this.http
      .post(url, {'type': itemType, message: message}, HttpUtility.jsonRequestOptions)
      .map(response => response.json())
      .catch(error => HttpUtility.logAndThrowError(this.logger, error));
  }

  /**
   * Begins an "edit item" transaction.  This creates a scratchpad branch in the item bank.
   * Changes made to this item will be written to the scratchpad branch.
   * An item may only be edited by one user at a time.
   * @param itemId of the item to be edited
   * @param message to be captured as the commit message in the repo
   * @returns Observable containing the item in its current state
   */
  beginEditTransaction(itemId: string, message: string): Observable<Item> {
    this.logger.debug(`Beginning "edit item" transaction for item having ID ${itemId} with message "${message}"`);

    // TODO: Map JSON returned from HTTP request to model object
    const url = `${ItemService.serviceUrl}/${itemId}/transactions`;
    return this.http
      .post(url, {message: message}, HttpUtility.jsonRequestOptions)
      .map(response => response.json())
      .catch(error => HttpUtility.logAndThrowError(this.logger, error));
  }

  /**
   * Saves a change to the scratchpad branch in the item bank.
   * Changes may only be saved to an item that has an open create or edit transaction.
   * Changes may only be saved by the user who is creating or editing the item.
   * @param transactionId of the create or edit transaction that is in progress
   * @param item to have changes saved
   * @param message to be captured as the commit message for this change in the repo
   * @returns Observable indicating when the update has completed
   */
  updateTransaction(transactionId: string, item: Item, message: string): Observable<void> {
    this.logger.debug(
      `Updating transaction ${transactionId} for item ${JSON.stringify(item)} with message "${message}"`);

    const url = `${ItemService.serviceUrl}/${item.id}/transactions/${transactionId}`;
    return this.http
      .patch(url, {item: item, message: message}, HttpUtility.jsonRequestOptions)
      .map(_ => null)
      .catch(error => HttpUtility.logAndThrowError(this.logger, error));
  }

  /**
   * Commits the changes that have been saved during the current transaction.  Merges the
   * scratchpad branch to the master branch then deletes the scratchpad branch from the repo.
   * A transaction may only be committed by the user who is creating or editing the item.
   * @param transactionId of the transaction to be committed
   * @param item containing a final set of changes to be persisted to the scratchpad branch
   * before the transaction is committed
   * @param message to be saved as the commit message when the scratchpad branch is merged into
   * the master branch
   * @returns Observable indicating when the transaction has been committed
   */
  commitTransaction(transactionId: string, item: Item, message: string): Observable<void> {
    this.logger.debug(
      `Committing transaction ${transactionId} for item ${JSON.stringify(item)} with message "${message}"`);

    const url = `${ItemService.serviceUrl}/${item.id}/transactions/${transactionId}`;
    return this.http
      .put(url, {item: item, message: message}, HttpUtility.jsonRequestOptions)
      .map(_ => null)
      .catch(error => HttpUtility.logAndThrowError(this.logger, error));
  }

  /**
   * Rolls back the changes that have been saved during the current transaction.  If the
   * current transaction is a "create item" transaction then the repo is removed from the item
   * bank.  If the current transaction is an "edit item" transaction then the scratchpad branch
   * is removed.
   * @param transactionId of the transaction to roll back
   * @param itemId of the item to have the current transaction rolled back
   * @returns Observable indicating when the transaction has been rolled back
   */
  rollbackTransaction(transactionId: string, itemId: string): Observable<void> {
    this.logger.debug(`Rolling back transaction ${transactionId} for item having ID ${itemId}`);

    const url = `${ItemService.serviceUrl}/${itemId}/transactions/${transactionId}`;
    return this.http
      .delete(url)
      .map(_ => null)
      .catch(error => HttpUtility.logAndThrowError(this.logger, error));
  }
}

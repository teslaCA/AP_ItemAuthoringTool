import {Injectable} from "@angular/core";
import {Http, ResponseContentType} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/fromPromise";
import {Item} from "app/item/services/item.service/item";
import {HttpUtility} from "../../../core/http-utility.service/http-utility";
import {ItemFactory} from "app/item/services/item.service/item-factory";

@Injectable()
export class ItemService {
  private static serviceUrl = '/api/ims/v1/items';

  constructor(private http: Http,
              private httpUtility: HttpUtility) {
  }

  /**
   * Return the item with the given ID
   * @param itemId ID of the item to return
   * @param showAlertOnError whether to show alert on error
   * @param showBusyIndicator whether to show busy indicator while executing
   * @returns Observable containing the item with the given ID
   */
  findItem(itemId: string,
           showAlertOnError = true,
           showBusyIndicator = true): Observable<Item> {
    const url = `${ItemService.serviceUrl}/${encodeURIComponent(itemId.trim())}`;
    return this.httpUtility.applyAsyncHandling(
      "Loading",
      this.http
        .get(url, HttpUtility.jsonRequestOptions)
        .map(response => ItemFactory.fromJson(response.json())),
      showAlertOnError,
      showBusyIndicator
    );
  }

  /**
   * Begin a "create item" transaction.  This creates a repo and scratchpad branch in the item bank.
   * Changes made to this item will be written to the scratchpad branch.
   * @param itemType type of the item to create
   * @param message to be captured as the commit message in the repo
   * @param showAlertOnError whether to show alert on error
   * @param showBusyIndicator whether to show busy indicator while executing
   * @returns Observable containing the item in its initial state
   */
  beginCreateTransaction(itemType: string,
                         message: string,
                         showAlertOnError = true,
                         showBusyIndicator = true): Observable<Item> {
    const url = `${ItemService.serviceUrl}/transactions`;
    return this.httpUtility.applyAsyncHandling(
      "Creating",
      this.http
        .post(url, {'type': itemType, message: message}, HttpUtility.jsonRequestOptions)
        .map(response => ItemFactory.fromJson(response.json())),
      showAlertOnError,
      showBusyIndicator
    );
  }

  /**
   * Begins an "edit item" transaction.  This creates a scratchpad branch in the item bank.
   * Changes made to this item will be written to the scratchpad branch.
   * An item may only be edited by one user at a time.
   * @param itemId of the item to be edited
   * @param message to be captured as the commit message in the repo
   * @param showAlertOnError whether to show alert on error
   * @param showBusyIndicator whether to show busy indicator while executing
   * @returns Observable containing the item in its current state
   */
  beginEditTransaction(itemId: string,
                       message: string,
                       showAlertOnError = true,
                       showBusyIndicator = true): Observable<Item> {
    const url = `${ItemService.serviceUrl}/${itemId}/transactions`;
    return this.httpUtility.applyAsyncHandling(
      "Opening for edit",
      this.http
        .post(url, {message: message}, HttpUtility.jsonRequestOptions)
        .map(response => ItemFactory.fromJson(response.json())),
      showAlertOnError,
      showBusyIndicator
    );
  }

  /**
   * Saves a change to the scratchpad branch in the item bank.
   * Changes may only be saved to an item that has an open create or edit transaction.
   * Changes may only be saved by the user who is creating or editing the item.
   * @param transactionId of the create or edit transaction that is in progress
   * @param item to have changes saved
   * @param message to be captured as the commit message for this change in the repo
   * @param showAlertOnError whether to show alert on error
   * @param showBusyIndicator whether to show busy indicator while executing
   * @returns Observable indicating when the update has completed
   */
  updateTransaction(transactionId: string,
                    item: Item,
                    message: string,
                    showAlertOnError = true,
                    showBusyIndicator = true): Observable<void> {
    const url = `${ItemService.serviceUrl}/${item.id}/transactions/${transactionId}`;
    return this.httpUtility.applyAsyncHandling(
      "Saving changes",
      this.http
        .patch(url, {item: item, message: message}, HttpUtility.jsonRequestOptions)
        .map(_ => null),
      showAlertOnError,
      showBusyIndicator
    );
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
   * @param showAlertOnError whether to show alert on error
   * @param showBusyIndicator whether to show busy indicator while executing
   * @returns Observable indicating when the transaction has been committed
   */
  commitTransaction(transactionId: string,
                    item: Item,
                    message: string,
                    showAlertOnError = true,
                    showBusyIndicator = true): Observable<void> {
    const url = `${ItemService.serviceUrl}/${item.id}/transactions/${transactionId}`;
    return this.httpUtility.applyAsyncHandling(
      "Committing changes",
      this.http
        .put(url, {item: item, message: message}, HttpUtility.jsonRequestOptions)
        .map(_ => null),
      showAlertOnError,
      showBusyIndicator
    );
  }

  /**
   * Rolls back the changes that have been saved during the current transaction.  If the
   * current transaction is a "create item" transaction then the repo is removed from the item
   * bank.  If the current transaction is an "edit item" transaction then the scratchpad branch
   * is removed.
   * @param transactionId of the transaction to roll back
   * @param itemId of the item to have the current transaction rolled back
   * @param showAlertOnError whether to show alert on error
   * @param showBusyIndicator whether to show busy indicator while executing
   * @returns Observable indicating when the transaction has been rolled back
   */
  rollbackTransaction(transactionId: string,
                      itemId: string,
                      showAlertOnError = true,
                      showBusyIndicator = true): Observable<void> {
    const url = `${ItemService.serviceUrl}/${itemId}/transactions/${transactionId}`;
    return this.httpUtility.applyAsyncHandling(
      "Discarding changes",
      this.http
        .delete(url)
        .map(_ => null),
      showAlertOnError,
      showBusyIndicator
    );
  }

  /**
   * @param transactionId of the transaction where the file to be deleted exists
   * @param itemId of the item to have the current transaction
   * @param fileName of the file to be deleted
   * @param showAlertOnError whether to show alert on error
   * @param showBusyIndicator whether to show busy indicator while executing
   * @returns Observable indicating when the file was deleted successfully
   */
  deleteBrailleFile(transactionId: string,
                    itemId: string,
                    fileName: string,
                    showAlertOnError = true,
                    showBusyIndicator = true): Observable<void> {
    const url = `${ItemService.serviceUrl}/${itemId}/transactions/${transactionId}/braille/${fileName}`;
    return this.httpUtility.applyAsyncHandling(
      "Deleting braille file",
      this.http
        .delete(url)
        .map(_ => null),
      showAlertOnError,
      showBusyIndicator
    );
  }

  /**
   * @param transactionId of the transaction where the file to be deleted exists
   * @param itemId of the item to have the current transaction
   * @param fileName of the file to be deleted
   * @param showAlertOnError whether to show alert on error
   * @param showBusyIndicator whether to show busy indicator while executing
   * @returns Observable indicating when the file was deleted successfully
   */
  deleteAslFile(transactionId: string,
                    itemId: string,
                    fileName: string,
                    showAlertOnError = true,
                    showBusyIndicator = true): Observable<void> {
    const url = `${ItemService.serviceUrl}/${itemId}/transactions/${transactionId}/asl/${fileName}`;
    return this.httpUtility.applyAsyncHandling(
        "Deleting asl file",
        this.http
            .delete(url)
            .map(_ => null),
        showAlertOnError,
        showBusyIndicator
    );
  }
}

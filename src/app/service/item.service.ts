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
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Item } from '../model/item';
import {Logger} from "../utility/logger";
import {AlertService} from "./alert.service";

@Injectable()
export class ItemService {

  private static serviceUrl = '/api/ims/v1/items';
  private static requestOptions = new RequestOptions({ headers : new Headers({ 'Content-Type': 'application/json'}) });

  constructor(
    private logger: Logger,
    private http: Http,
    private alertService: AlertService  // TODO: Remove injection of AlertService once all public methods return Observables (the caller will use the AlertService to alert user to success or failure)
  ) { }

  //---------------------------------------------------------------------------
  // Item lookup
  //---------------------------------------------------------------------------
  // Return the item with the given ID
  findItem(itemId: number): Observable<Item> {
    const url = ItemService.serviceUrl + '/' + itemId;

    this.logger.debug(`Finding item with ID ${itemId}: ${url}`);

    return this.http
      .get(ItemService.serviceUrl + '/' + itemId, ItemService.requestOptions)
      .map(ItemService.extractJson)
      .catch(this.handleError);
  }

  //---------------------------------------------------------------------------
  // Item create
  //---------------------------------------------------------------------------
  // Begin creating an item (creates a scratchpad to which updates will be saved)
  beginItemCreate(itemType: string): Observable<Item> {
    const url = ItemService.serviceUrl + '/begin';

    this.logger.debug(`Beginning creation of item type ${itemType}: ${url}`);

    return this.http
      .post(url, { 'type': itemType }, ItemService.requestOptions)
      .map(ItemService.extractJson)
      .catch(this.handleError);
  }

  // Commit the creation of the item (the item will become available in the system)
  // TODO: Change to return Observable so caller can decide what to do on success/failure
  commitItemCreate(item: Item): void {
    const url = ItemService.serviceUrl + '/' + item.id + '/commit';

    this.logger.debug(`Committing creation of item ${JSON.stringify(item)}: ${url}`);

    this.http
      .post(url, { item: item }, ItemService.requestOptions)
      .subscribe(
        (response: Response) => {
          this.alertService.success('Item Created', 'Your item has been created and added to the item bank.');

          this.logger.debug('post ' + url + ' operation successful');
        },
        e => {
          this.alertService.error('Error Creating Item', `An error was encountered trying to create your item.  Reason:\n\n${e}`);

          this.handleError(e);
        });
  }

  // Rollback the creation of the item (the item will be removed entirely)
  // TODO: Change to return Observable so caller can decide what to do on success/failure
  rollbackItemCreate(itemId: number): void {
    const url = ItemService.serviceUrl + '/' + itemId + '/rollback';

    this.logger.debug(`Rolling back creation of item with ID ${itemId}: ${url}`);

    this.http
      .post(url, null, ItemService.requestOptions)
      .subscribe(
        (response: Response) => {
          this.alertService.success('Creation Cancelled', 'The item you were creating has been successfully removed.');

          this.logger.debug('delete ' + url + ' operation successful');
        },
        e => {
          this.alertService.error('Error Cancelling Creation', `An error was encountered trying to cancel the creation of your item.  Reason:\n\n${e}`);

          this.handleError(e);
        });
  }

  //---------------------------------------------------------------------------
  // Item edit
  //---------------------------------------------------------------------------
  // Begin editing an item (creates a scratchpad to which updates will be saved)
  beginItemEdit(itemId: number): Observable<boolean> {
    const url = ItemService.serviceUrl + '/' + itemId + '/begin';

    this.logger.debug(`Beginning edit of item with ID ${itemId}: ${url}`);

    return this.http
      .put(url, null, ItemService.requestOptions)
      .map(() => { return new Observable<boolean>(); })
      .catch(this.handleError);
  }

  // Commit the editing of the item (the changes to the item will become available in the system)
  // TODO: Change to return Observable so caller can decide what to do on success/failure
  commitItemEdit(item: Item, commitMessage: string): void {
    const url = ItemService.serviceUrl + '/' + item.id + '/commit';

    this.logger.debug(`Committing edit of item ${JSON.stringify(item)}: ${url}`);

    this.http
      .put(url, { item: item, message: commitMessage }, ItemService.requestOptions)
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
  rollbackItemEdit(itemId: number): void {
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
        (response: Response) => { this.logger.debug('post ' + url + ' operation successful'); },
        e => { this.handleError(e); });
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

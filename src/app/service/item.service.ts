import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Item } from '../model/item';
import {Logger} from "../utility/logger";

@Injectable()
export class ItemService {

  private static serviceUrl = '/api/ims/v1/items';
  private static requestOptions = new RequestOptions({ headers : new Headers({ 'Content-Type': 'application/json'}) });

  constructor(
    private logger: Logger,
    private http: Http
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
        (response: Response) => { this.logger.debug('post ' + url + ' operation successful'); },
        e => { this.handleError(e); });
  }

  // Rollback the creation of the item (the item will be removed entirely)
  // TODO: Change to return Observable so caller can decide what to do on success/failure
  rollbackItemCreate(itemId: number): void {
    const url = ItemService.serviceUrl + '/' + itemId + '/rollback';

    this.logger.debug(`Rolling back creation of item with ID ${itemId}: ${url}`);

    this.http
      .post(url, null, ItemService.requestOptions)
      .subscribe(
        (response: Response) => { this.logger.debug('delete ' + url + ' operation successful'); },
        e => { this.handleError(e); });
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
        (response: Response) => { this.logger.debug('put ' + url + ' operation successful'); },
        e => { this.handleError(e); });
  }

  // Rollback the editing of the item (the changes made to the item since editing began will be removed)
  // TODO: Change to return Observable so caller can decide what to do on success/failure
  rollbackItemEdit(itemId: number): void {
    const url = ItemService.serviceUrl + '/' + itemId + '/rollback';

    this.logger.debug(`Rolling back edit of item with ID ${itemId}: ${url}`);

    this.http
      .put(url, null, ItemService.requestOptions)
      .subscribe(
        (response: Response) => { this.logger.debug('put ' + url + ' operation successful'); },
        e => { this.handleError(e); });
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

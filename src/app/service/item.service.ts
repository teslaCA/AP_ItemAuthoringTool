import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Item } from '../model/item';

@Injectable()
export class ItemService {

  private static serviceUrl = '/api/ims/v1/items';
  private static requestOptions = new RequestOptions({ headers : new Headers({ 'Content-Type': 'application/json'}) });

  constructor(private http: Http) { }

  //---------------------------------------------------------------------------
  // Item lookup
  //---------------------------------------------------------------------------
  // Return the item with the given ID
  findItem(itemId: number): Observable<Item> {
    const url = ItemService.serviceUrl + '/' + itemId;

    console.log(`Finding item with ID ${itemId}: ${url}`);

    return this.http
      .get(ItemService.serviceUrl + '/' + itemId, ItemService.requestOptions)
      .map(ItemService.extractJson)
      .catch(ItemService.handleError);
  }

  //---------------------------------------------------------------------------
  // Item create
  //---------------------------------------------------------------------------
  // Begin creating an item (creates a scratchpad to which updates will be saved)
  beginItemCreate(itemType: string): Observable<Item> {
    const url = ItemService.serviceUrl + '/begin';

    console.log(`Beginning creation of item type ${itemType}: ${url}`);

    return this.http
      .post(url, { 'type': itemType }, ItemService.requestOptions)
      .map(ItemService.extractJson)
      .catch(ItemService.handleError);
  }

  // Commit the creation of the item (the item will become available in the system)
  // TODO: Change to return Observable so caller can decide what to do on success/failure
  commitItemCreate(item: Item): void {
    const url = ItemService.serviceUrl + '/' + item.id + '/commit';

    console.log(`Committing creation of item ${JSON.stringify(item)}: ${url}`);

    this.http
      .post(url, { item: item }, ItemService.requestOptions)
      .subscribe(
        (response: Response) => { console.log('post ' + url + ' operation successful'); },
        e => { ItemService.handleError(e); });
  }

  // Rollback the creation of the item (the item will be removed entirely)
  // TODO: Change to return Observable so caller can decide what to do on success/failure
  rollbackItemCreate(itemId: number): void {
    const url = ItemService.serviceUrl + '/' + itemId + '/rollback';

    console.log(`Rolling back creation of item with ID ${itemId}: ${url}`);

    this.http
      .post(url, null, ItemService.requestOptions)
      .subscribe(
        (response: Response) => { console.log('delete ' + url + ' operation successful'); },
        e => { ItemService.handleError(e); });
  }

  //---------------------------------------------------------------------------
  // Item edit
  //---------------------------------------------------------------------------
  // Begin editing an item (creates a scratchpad to which updates will be saved)
  beginItemEdit(itemId: number): Observable<boolean> {
    const url = ItemService.serviceUrl + '/' + itemId + '/begin';

    console.log(`Beginning edit of item with ID ${itemId}: ${url}`);

    return this.http
      .put(url, null, ItemService.requestOptions)
      .map(() => { return new Observable<boolean>(); })
      .catch(ItemService.handleError);
  }

  // Commit the editing of the item (the changes to the item will become available in the system)
  // TODO: Change to return Observable so caller can decide what to do on success/failure
  commitItemEdit(item: Item, commitMessage: string): void {
    const url = ItemService.serviceUrl + '/' + item.id + '/commit';

    console.log(`Committing edit of item ${JSON.stringify(item)}: ${url}`);

    this.http
      .put(url, { item: item, message: commitMessage }, ItemService.requestOptions)
      .subscribe(
        (response: Response) => { console.log('put ' + url + ' operation successful'); },
        e => { ItemService.handleError(e); });
  }

  // Rollback the editing of the item (the changes made to the item since editing began will be removed)
  // TODO: Change to return Observable so caller can decide what to do on success/failure
  rollbackItemEdit(itemId: number): void {
    const url = ItemService.serviceUrl + '/' + itemId + '/rollback';

    console.log(`Rolling back edit of item with ID ${itemId}: ${url}`);

    this.http
      .put(url, null, ItemService.requestOptions)
      .subscribe(
        (response: Response) => { console.log('put ' + url + ' operation successful'); },
        e => { ItemService.handleError(e); });
  }

  //---------------------------------------------------------------------------
  // Item save
  //---------------------------------------------------------------------------
  // Save changes to the item (update the scratchpad)
  // TODO: Change to return Observable so caller can decide what to do on success/failure
  saveItem(item: Item): void {
    const url = ItemService.serviceUrl + '/' + item.id + '/save';

    console.log(`Saving item ${JSON.stringify(item)}: ${url}`);

    this.http
      .post(url, JSON.stringify(item), ItemService.requestOptions)
      .subscribe(
        (response: Response) => { console.log('post ' + url + ' operation successful'); },
        e => { ItemService.handleError(e); });
  }

  //---------------------------------------------------------------------------
  // Helpers
  //---------------------------------------------------------------------------
  private static extractJson(res: Response): any | {} {
    return res.json() || {};
  }

  // TODO: Can this be removed once all public methods return Observables instead of handling errors internally?
  private static handleError(error: Response | any): any {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error('Item Service: ' + errMsg);
    return Observable.throw(error);
  }
}

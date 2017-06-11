import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/fromPromise";

import {Logger} from "./logger.service";
import {Item} from "app/model/item/item";

@Injectable()
export class ItemService {
  private static serviceUrl = '/api/ims/v1/items';

  private static requestOptions = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

  constructor(private logger: Logger,
              private http: Http) {
  }

  //---------------------------------------------------------------------------
  // Item search
  //---------------------------------------------------------------------------
  // Return the item with the given ID
  findItem(itemId: string): Observable<Item> {
    const url = `${ItemService.serviceUrl}/${itemId}`;
    return this.http
      .get(url, ItemService.requestOptions)
      .map(ItemService.extractJson)
      .catch(this.handleError);
  }

  //---------------------------------------------------------------------------
  // Item create
  //---------------------------------------------------------------------------
  // Begin creating an item (creates a scratchpad to which updates will be saved)
  beginItemCreate(itemType: string): Observable<Item> {
    const url = `${ItemService.serviceUrl}/begin`;
    return this.http
      .post(url, {'type': itemType}, ItemService.requestOptions)
      .map(ItemService.extractJson)
      .catch(this.handleError);
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
      .catch(this.handleError);
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
      .catch(this.handleError);
  }

  // Commit the editing of the item (the changes to the item will become available in the system)
  commitItemEdit(item: Item, commitMessage: string): Observable<void> {
    const url = `${ItemService.serviceUrl}/${item.id}/commit`;
    return this.http
      .put(url, {item: item, message: commitMessage}, ItemService.requestOptions)
      .map(_ => null)
      .catch(this.handleError);
  }

  // Rollback the editing of the item (the changes made to the item since editing began will be removed)
  rollbackItemEdit(itemId: string): Observable<void> {
    const url = `${ItemService.serviceUrl}/${itemId}/rollback`;
    return this.http
      .put(url, null, ItemService.requestOptions)
      .map(_ => null)
      .catch(this.handleError);
  }

  //---------------------------------------------------------------------------
  // Item save
  //---------------------------------------------------------------------------
  // Save changes to the item (update the scratchpad)
  // TODO: Determine if there should be two versions of this method - POST for saving create, PUT for saving edit
  // TODO: Do not remove this method; remove this TODO when auto-save makes use of this method
  saveChanges(item: Item): Observable<void> {
    const url = `${ItemService.serviceUrl}/${item.id}/save`;
    return this.http
      .post(url, JSON.stringify(item), ItemService.requestOptions)
      .map(_ => null)
      .catch(this.handleError);
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

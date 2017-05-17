import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Item } from '../model/item';

@Injectable()
export class ItemService {

  serviceUrl = '/api/ims/v1/items';

  constructor(
    private http: Http
  ) { }


  getItem(id: number): Observable<Item> {
    const item = new Item();

    const getUrl = this.serviceUrl + '/' + id;

    console.log('getting item: ', id);

    return this.http
      .get(getUrl, this.getRequestOptions())
      .map(this.extractJson)
      .catch(this.handleError);
  }

  /**
   * POST Operations used when Item is in 'Create' mode
   */
  createItem(id: number): void {
    const createUrl = this.serviceUrl + '/' + id + '/commit';

    this.http
      .post(createUrl, null, this.getRequestOptions())
      .subscribe(
        (response: Response) => {
          console.log('post ' + createUrl + ' operation successful');
        },
        e => {
          this.handleError(e);
        });
  }

  createScratchPad(type: string): Observable<Item> {
      const scratchURL = this.serviceUrl + '/begin';

      return this.http
        .post(scratchURL, { type }, this.getRequestOptions())
        .map(this.extractJson)
        .catch(this.handleError);

  }

  deleteScratchPad(id: number): void {
    const deleteUrl = this.serviceUrl + '/' + id + '/rollback';

    this.http
      .post(deleteUrl, null, this.getRequestOptions())
      .subscribe(
        (response: Response) => {
          console.log('delete ' + deleteUrl + ' operation successful');
        },
        e => {
          this.handleError(e);
        });
  }

  saveScratchPad(item: Item): void {
    const saveUrl = this.serviceUrl + '/' + item.id + '/save';

    console.log('item payload: {}', JSON.stringify(item));

    this.http
      .post(saveUrl, JSON.stringify(item), this.getRequestOptions())
      .subscribe(
        (response: Response) => {
          console.log('post ' + saveUrl + ' operation successful');
        },
        e => {
          this.handleError(e);
        });

  }

  /**
   * PUT Operations used when Item is
   * @param id
   */
  editItem(id: number): Observable<boolean> {
    const editUrl = this.serviceUrl + '/' + id + '/begin';

    return this.http
      .put(editUrl, null, this.getRequestOptions())
      .map(() => {
          return new Observable<boolean>();
      })
      .catch(this.handleError)

  }

  deleteEdit(id: number): void {
    const deleteUrl = this.serviceUrl + '/' + id + '/rollback';

    this.http
      .put(deleteUrl, null, this.getRequestOptions())
      .subscribe(
        (response: Response) => {
          console.log('put ' + deleteUrl + ' operation successful');
        },
        e => {
          this.handleError(e);
        });
  }

  commitItem(id: number, message: string): void {
    const createUrl = this.serviceUrl + '/' + id + '/commit';

    this.http
      .put(createUrl, {message}, this.getRequestOptions())
      .subscribe(
        (response: Response) => {
          console.log('put ' + createUrl + ' operation successful');
        },
        e => {
          this.handleError(e);
        });
  }


  private extractJson(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private getRequestOptions(): any {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    return new RequestOptions({ headers : headers });
  }
}

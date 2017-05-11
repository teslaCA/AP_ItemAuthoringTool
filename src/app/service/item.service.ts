import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Item } from '../model/item';
import {serializeSummaries} from "@angular/compiler/src/aot/summary_serializer";


@Injectable()
export class ItemService {

  serviceUrl = '/api/ims/v1/items';

  constructor(
    private http: Http
  ) { }

  createScratchPad(type: string): Observable<Item> {
      const scratchURL = this.serviceUrl;

      return this.http.post(scratchURL, { type }, this.getRequestOptions())
                      .map(this.extractData)
                      .catch(this.handleError);

  }

  saveItem(item: Item): void {
    const saveUrl = this.serviceUrl + '/' + item.id;

    console.log('item payload: '  + JSON.stringify(item));

    this.http.put(saveUrl, JSON.stringify(item), this.getRequestOptions())
      .subscribe(
        (response: Response) => {
          console.log('put operation successful');
        },
        e => {
          this.handleError(e);
        });

  }


  createItem(id: number): void {
    const createUrl = this.serviceUrl + '/' + id + '/commit';

    console.log('createUrl: ' + createUrl)

    this.http.put(createUrl, {}, this.getRequestOptions())
      .subscribe(
        (response: Response) => {
          console.log('put operation successful');
          },
        e => {
          this.handleError(e);
        });
  }

  deleteItem(id: number): void {

    const deleteUrl = this.serviceUrl + '/' + id;

    this.http.delete(deleteUrl, this.getRequestOptions())
      .subscribe(
        (response: Response) => {
          console.log('delete operation successful');
        },
        e => {
          this.handleError(e);
        });
  }


  private extractData(res: Response) {
    let body = res.json();
    return body || {};;
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

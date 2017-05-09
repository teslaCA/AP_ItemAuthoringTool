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

  createItem(type: string): Observable<Item> {

      const headers = new Headers({ 'Content-Type': 'application/json'});
      const options = new RequestOptions({ headers : headers });

      return this.http.post(this.serviceUrl, { type }, options)
                      .map(this.extractData)
                      .catch(this.handleError);

  }

  private extractData(res: Response) {
    // let body = res.json();
    // return body.data || { };
    return res.json();
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
}

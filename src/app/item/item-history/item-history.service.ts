///<reference path="../../../../node_modules/@angular/http/src/body.d.ts"/>
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
import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import {Logger} from "../../service/logger.service";

@Injectable()
export class ItemHistoryService {

  private static serviceUrl = '/api/ims/v1/items';
  private static requestOptions = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

  constructor(private logger: Logger,
              private http: Http) {
  }

  //---------------------------------------------------------------------------
  // Item history
  //---------------------------------------------------------------------------

  // Return the item with the given ID
  getItemHistory(itemId: string): Observable<any> {
    const url = ItemHistoryService.serviceUrl + '/' + itemId + '/history';

    this.logger.debug(`Getting history for item ID ${itemId}: ${url}`);

    return this.http
      .get(url, ItemHistoryService.requestOptions)
      .map(res => ItemHistoryService.extractJson(res))
      .catch(err => this.handleError(err));
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
    this.logger.error('Item History Service: ' + message);
    return Observable.throw(error);
  }
}

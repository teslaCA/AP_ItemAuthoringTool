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
export class ItemHistoryService {
  private static serviceUrl = '/api/ims/v1/items';

  constructor(private http: Http,
              private logger: Logger) {
  }

  /**
   * Return list of changes to the item.
   * @param itemId of the item for which history will be retrieved
   * @returns Observable of the list of changes to the item
   */
  findItemHistory(itemId: string): Observable<any> {   // TODO: Strongly type
    this.logger.debug(`Finding item history for item having ID ${itemId}`);

    // TODO: Map JSON returned from HTTP request to model object (List<ItemChange>)
    const url = ItemHistoryService.serviceUrl + '/' + itemId + '/history';
    return this.http
      .get(url, HttpUtility.jsonRequestOptions)
      .map(response => response.json())
      .catch(error => HttpUtility.logAndThrowError(this.logger, error));
  }
}

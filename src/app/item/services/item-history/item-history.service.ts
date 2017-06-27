import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/fromPromise";
import {JsonConvert} from "json2typescript";
import {HttpUtility} from "../../../core/services/http-utility/http-utility";
import {ItemChange} from "./item-change";

@Injectable()
export class ItemHistoryService {
  private static serviceUrl = '/api/ims/v1/items';

  constructor(private http: Http,
              private httpUtility: HttpUtility) {
  }

  /**
   * Return list of changes to the item.
   * @param itemId of the item for which history will be retrieved
   * @returns Observable of the list of changes to the item
   */
  findItemHistory(itemId: string): Observable<ItemChange[]> {
    // TODO: IAT-38 - Remove after IMS supports STIM
    if (itemId === "123456FAKE") {
      return Observable.of([]);
    }

    const url = ItemHistoryService.serviceUrl + '/' + itemId + '/history';
    return this.httpUtility.applyAsyncHandling(
      "Finding item history",
      this.http
        .get(url, HttpUtility.jsonRequestOptions)
        .map(response => JsonConvert.deserializeArray(response.json(), ItemChange))
    );
  }
}

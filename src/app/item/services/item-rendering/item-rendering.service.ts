import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/fromPromise";
import {HttpUtility} from "../../../core/services/http-utility/http-utility";
import {ItemRenderingResponse} from "./item-rendering-response";

@Injectable()
export class ItemRenderingService {
  private static serviceUrl = '/api/irs/v1/items';

  constructor(private http: Http,
              private httpUtility: HttpUtility) {
  }

  /**
   * Calls IRS service to prepare Item content to be rendered (previewed)
   * @param itemId ID of the item to return
   * @returns Observable containing the item with the given ID
   */
  renderItem(itemId: string): Observable<ItemRenderingResponse> {
    const url = `${ItemRenderingService.serviceUrl}/${encodeURIComponent(itemId.trim())}`;
    return this.httpUtility.applyAsyncHandling(
      "Cloning item",
      this.http
        .get(url, HttpUtility.jsonRequestOptions)
        .map(response => response.json())
    );
  }

}

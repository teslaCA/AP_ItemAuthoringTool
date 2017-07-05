import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/fromPromise";
import {HttpUtility} from "../../../core/http-utility.service/http-utility";
import {ItemPreviewResponse} from "./item-preview-response";

@Injectable()
export class ItemPreviewService {
  private static serviceUrl = '/api/irs/v1/items';

  constructor(private http: Http,
              private httpUtility: HttpUtility) {
  }

  /**
   * Calls IRS service to prepare Item content to be rendered (previewed)
   * @param itemId ID of the item to return
   * @returns Observable containing the item rendering response
   */
  previewItem(itemId: string): Observable<ItemPreviewResponse> {
    const url = `${ItemPreviewService.serviceUrl}/${encodeURIComponent(itemId.trim())}`;
    return this.httpUtility.applyAsyncHandling(
      "Cloning item",
      this.http
        .get(url, HttpUtility.jsonRequestOptions)
        .map(response => response.json())
    );
  }
}

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
   * @param showAlertOnError whether to show alert on error
   * @param showBusyIndicator whether to show busy indicator while executing
   * @returns Observable containing the item rendering response
   */
  previewItem(itemId: string,
              showAlertOnError = true,
              showBusyIndicator = true): Observable<ItemPreviewResponse> {
    const url = `${ItemPreviewService.serviceUrl}/${encodeURIComponent(itemId.trim())}`;
    return this.httpUtility.applyAsyncHandling(
      "Loading preview",
      this.http
        .get(url, HttpUtility.jsonRequestOptions)
        .map(response => response.json()),
      showAlertOnError,
      showBusyIndicator
    );
  }
}

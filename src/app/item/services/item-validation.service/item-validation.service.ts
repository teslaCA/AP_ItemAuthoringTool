import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/fromPromise";
import {JsonConvert} from "json2typescript";
import {HttpUtility} from "../../../core/http-utility.service/http-utility";
import {ItemValidationResults} from "../item-validation.service/item-validation-results";

@Injectable()
export class ItemValidationService {
  private static serviceUrl = '/api/ims/v1/items/';

  constructor(private http: Http,
              private httpUtility: HttpUtility) {
  }

  findErrorMessages(itemId: string,
                  showAlertOnError = true,
                  showBusyIndicator = true): Observable<ItemValidationResults> {
    const url = ItemValidationService.serviceUrl + '/' + itemId + '/validation';
    return this.httpUtility.applyAsyncHandling(
      "Loading Validation Results",
      this.http
        .get(url, HttpUtility.jsonRequestOptions)
        .map(response => JsonConvert.deserializeObject(response.json(), ItemValidationResults)),
      showAlertOnError,
      showBusyIndicator
    );
  }
}

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/fromPromise";
import {JsonConvert} from "json2typescript";
import {HttpUtility} from "../../../core/http-utility.service/http-utility";
import {ItemValidationError} from "../item-validation.service/item-validation-error";

@Injectable()
export class ItemValidationService {
  private static serviceUrl = '/api/ivs/v1/validation';

  constructor(private http: Http,
              private httpUtility: HttpUtility) {
  }

  findErrorMessages(itemId: string,
                  showAlertOnError = true,
                  showBusyIndicator = true): Observable<ItemValidationError[]> {
    const url = ItemValidationService.serviceUrl + '/' + itemId;
    return this.httpUtility.applyAsyncHandling(
      "Loading Validation Errors",
      this.http
        .get(url, HttpUtility.jsonRequestOptions)
        .map(response => JsonConvert.deserializeArray(response.json(), ItemValidationError)),
      showAlertOnError,
      showBusyIndicator
    );
  }
}

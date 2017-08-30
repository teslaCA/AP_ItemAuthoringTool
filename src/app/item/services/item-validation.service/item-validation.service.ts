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
    // TODO: IAT-580 - Remove when item validation is fully working
    const errors = [];
    const error1 = new ItemValidationError();
    error1.category = "Item";
    error1.detail = "wordlistId='281'";
    error1.message = "Item references non-existent wordlist (WIT)";
    error1.severity = "Severe";
    errors.push(error1);
    const error2 = new ItemValidationError();
    error2.category = "Metadata";
    error2.detail = "Found='' Expected='Automatic with Machine Rubric'";
    error2.message = "Automatic/HandScored scoring metadata error.";
    error2.severity = "Degraded";
    errors.push(error2);
    const error3 = new ItemValidationError();
    error3.category = "Metadata";
    error3.detail = "Mathematical Practice field not present for MATH subject item.";
    error3.message = "Common Core Standard not included in PrimaryStandard metadata.";
    error3.severity = "Tolerable";
    errors.push(error3);
    const error4 = new ItemValidationError();
    error4.category = "Metadata";
    error4.detail = "Claim='MA-Undesignated'";
    error4.message = "Unexpected claim value (Should be 1, 2, 3, or 4 with possible suffix).";
    error4.severity = "Benign";
    errors.push(error4);
    return Observable.of(errors);

    // TODO: IAT-580 - Uncomment when item validation is fully working
    // const url = ItemValidationService.serviceUrl + '/' + itemId;
    // return this.httpUtility.applyAsyncHandling(
    //   "Loading Validation Errors",
    //   this.http
    //     .get(url, HttpUtility.jsonRequestOptions)
    //     .map(response => JsonConvert.deserializeArray(response.json(), ItemValidationError)),
    //   showAlertOnError,
    //   showBusyIndicator
    // );
  }
}

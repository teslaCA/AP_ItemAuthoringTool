import {Headers, RequestOptions, Response} from "@angular/http";

import {Logger} from "../services/logger/logger.service";
import {Observable} from "rxjs/Observable";

export class HttpUtility {
  /**
   * Options to be passed to a request containing JSON
   * @type {RequestOptions} to be passed
   */
  static jsonRequestOptions = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

  /**
   * Log the error to the logger then throw the error.
   * @param logger to which the error will be logged
   * @param error to be logged
   * @returns {any} Observable of the thrown error
   */
  static logAndThrowError(logger: Logger,
                          error: Response | any): Observable<Response | any> {
    let message: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      message = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      message = error.message ? error.message : error.toString();
    }
    logger.error(message);
    return Observable.throw(error);
  }
}

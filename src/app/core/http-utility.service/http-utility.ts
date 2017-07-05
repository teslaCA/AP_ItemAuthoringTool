import {Headers, RequestOptions, Response} from "@angular/http";

import {Logger} from "../logger.service/logger.service";
import {Observable} from "rxjs/Observable";
import {AlertService} from "../alert.service/alert.service";
import {BusyService} from "../busy.service/busy.service";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/multicast";

@Injectable()
export class HttpUtility {
  /**
   * Options to be passed to a request containing JSON
   * @type {RequestOptions} to be passed
   */
  static jsonRequestOptions = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

  constructor(private alertService: AlertService,
              private busyService: BusyService,
              private logger: Logger) {
  }

  /**
   * Wrap HTTP call with logging, error alert, and busy indicator.
   * @param requestDescription description of the HTTP request
   * @param source containing the HTTP request execution
   * @param showBusyIndicator whether to show the busy indicator while the call is in progress
   * @param showErrorAlert whether to show an alert when an error occurs
   * @returns observable containing the HTTP request execution
   */
  applyAsyncHandling<T>(requestDescription: string,
                        source: Observable<T>,
                        showBusyIndicator: boolean = true,
                        showErrorAlert: boolean = true): Observable<T> {
    // Make source a multicast observable to allow more than one subscriber for a single execution
    const refCounted = source.multicast(new Subject).refCount();

    // Subscribe adding logging, error alert, and busy indicator
    this.logger.debug(requestDescription);
    if (showBusyIndicator) {
      this.busyService.show(requestDescription);
    }
    refCounted.subscribe({
      next: (result: T) => {
        this.logger.debug(`Success ${requestDescription.toLowerCase()}, result: ${JSON.stringify(result)}`);
        if (showBusyIndicator) {
          this.busyService.hide();
        }
      },
      error: (error: Error) => {
        this.logger.debug(`Error ${requestDescription.toLowerCase()}, error: ${HttpUtility.stringifyError(error)}`);
        if (showBusyIndicator) {
          this.busyService.hide();
        }
        if (showErrorAlert) {
          this.alertService.error(
            `Error ${requestDescription.toLowerCase()}`,
            `An error occurred ${requestDescription.toLowerCase()}, error: ${HttpUtility.stringifyError(error)}`);
        }
      }
    });

    return refCounted;
  }

  /**
   * Extract error messages into a string that is usable to display on the application
   * @param error response. Contains an array of errors.
   * @returns {string} containing error message descriptions
   */
  getErrorMessageText(error: Response | any): string {
    let errorMessages: string;
    switch (error.status) {
      case 400:
      case 404: {
        const body = error.json() || '';
        const objMessages = JSON.parse(JSON.stringify(body));
        let msgs = '';
        if (objMessages instanceof Array) {
          for (const msg of objMessages) {
            msgs += msg.message + ' ';
          }
        }
        errorMessages = msgs;
        break;
      }
      default: {
        errorMessages = 'Internal server error';
        break;
      }
    }
    return errorMessages;
  }

  /**
   * Convert the error into a message
   * @param error to be stringified
   * @returns the stringified error message
   */
  private static stringifyError(error: Response | any): string {
    let message: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      message = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      message = error.message ? error.message : error.toString();
    }
    return message;
  }
}

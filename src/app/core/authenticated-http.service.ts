import {Injectable} from '@angular/core';
import {Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Logger} from "./logger.service";
import {AlertService} from "./alert.service";
import {BusyService} from "./busy.service/busy.service";

@Injectable()
export class AuthenticatedHttpService extends Http {

  constructor(private logger: Logger,
              private alertService: AlertService,
              private busyService: BusyService,
              private backend: XHRBackend,
              private defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

    return super.request(url, options).catch((error: Response) => {
      if (error.status === 401) {
        this.logger.debug('Received 401 - Authorization required');
        window.location.href = window.location.href;
      }
      return Observable.throw(error);
    });
  }

}

import {Injectable} from "@angular/core";
import {Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Logger} from "../logger.service/logger.service";

/**
 * Extends Http and intercepts all request calls.  The purpose is to
 * check for response error 401 Unauthorized.  The backend is using SAML.
 * When the frontend calls the bankend where the session has timed out the
 * SAML redirect flows start taking place ultimately resulting in the
 * frontend failing because it can't parse what the IDP gives back
 * which happens to be a self submitting HTML page.  The fix is to catch
 * the 401 error and refresh the page.  This avoids the SAML redirects
 * and gives the frontend the ability to react the way it wants to.
 */
@Injectable()
export class AuthenticatedHttpService extends Http {
  constructor(private logger: Logger,
              private backend: XHRBackend,
              private defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

    return super.request(url, options).catch((error: Response) => {
      if (error.status === 401) {
        this.logger.debug('Received 401 - Authorization required');

        // Reload current page
        window.location.href = window.location.href;
      }
      return Observable.throw(error);
    });
  }
}

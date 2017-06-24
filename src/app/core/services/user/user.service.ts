import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http, Response} from "@angular/http";
import {JsonConvert} from "json2typescript";

import {User} from "./user";
import {Logger} from "../logger/logger.service";

@Injectable()
export class UserService {
  private serviceUrl = '/api/users/principal';

  constructor(private http: Http,
              private logger: Logger) {
  }

  findCurrentUser(): Observable<User> {
    return this.http
      .request(this.serviceUrl)
      .map(response => JsonConvert.deserializeObject(response.json(), User))
      .catch(error => this.handleError(error));
  }

  // TODO: Move to service base class in app root module
  private handleError(error: Response | any): any {
    let message: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      message = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      message = error.message ? error.message : error.toString();
    }
    this.logger.error(message);
    return Observable.throw(error);
  }
}

import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {JsonConvert} from "json2typescript";

import {User} from "./user";
import {Logger} from "../logger/logger.service";
import {HttpUtility} from "../../util/http-utility";

@Injectable()
export class UserService {
  private serviceUrl = '/api/users/principal';

  constructor(private http: Http,
              private logger: Logger) {
  }

  findCurrentUser(): Observable<User> {
    this.logger.debug('Finding current user');

    return this.http
      .request(this.serviceUrl)
      .map(response => JsonConvert.deserializeObject(response.json(), User))
      .catch(error => HttpUtility.logAndThrowError(this.logger, error));
  }
}

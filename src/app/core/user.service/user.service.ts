import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {JsonConvert} from "json2typescript";

import {User} from "./user";
import {HttpUtility} from "../http-utility.service/http-utility";

@Injectable()
export class UserService {
  private serviceUrl = '/api/users/principal';

  constructor(private http: Http,
              private httpUtility: HttpUtility) {
  }

  findCurrentUser(): Observable<User> {
    return this.httpUtility.applyAsyncHandling(
      "Finding current user",
      this.http
        .request(this.serviceUrl)
        .map(response => JsonConvert.deserializeObject(response.json(), User))
    );
  }
}

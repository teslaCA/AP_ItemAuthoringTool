import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";

@Injectable()
export class UserService {
  private serviceUrl = '/api/users/principal';

  constructor(private http: Http) {
  }

  findCurrentUser(): Observable<any> {
    return this.http.request(this.serviceUrl);
  }
}

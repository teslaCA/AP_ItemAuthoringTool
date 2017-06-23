import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {User} from "./user";

@Injectable()
export class UserService {
  private serviceUrl = '/api/users/principal';

  constructor(private http: Http) {
  }

  findCurrentUser(): Observable<User> {
    return this.http
      .request(this.serviceUrl)
      .map(response => User.fromDto(response.json()));
  }
}

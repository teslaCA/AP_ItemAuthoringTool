import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BuildInfoService {
  private serviceUrl = '/manage/info';

  constructor(private http: Http) {
  }

  findBuildInfo(): Observable<any> {
    return this.http.request(this.serviceUrl);
  }
}

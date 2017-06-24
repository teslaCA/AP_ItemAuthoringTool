import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {AppInfo} from "./app-info";

@Injectable()
export class AppInfoService {
  private serviceUrl = '/manage/info';

  constructor(private http: Http) {
  }

  findAppInfo(): Observable<AppInfo> {
    return this.http
      .request(this.serviceUrl)
      .map(request => AppInfo.fromDto(request.json()));
  }
}

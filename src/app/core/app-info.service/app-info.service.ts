import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {JsonConvert} from "json2typescript";

import {AppInfo} from "./app-info";
import {HttpUtility} from "../http-utility.service/http-utility";

@Injectable()
export class AppInfoService {
  private serviceUrl = '/manage/info';

  constructor(private http: Http,
              private httpUtility: HttpUtility) {
  }

  findAppInfo(): Observable<AppInfo> {
    return this.httpUtility.applyAsyncHandling(
      "Finding app info",
      this.http
        .request(this.serviceUrl)
        .map(response => JsonConvert.deserializeObject(response.json(), AppInfo))
    );
  }
}

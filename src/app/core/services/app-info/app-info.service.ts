import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {JsonConvert} from "json2typescript";

import {AppInfo} from "./app-info";
import {HttpUtility} from "../../util/http-utility";
import {Logger} from "../logger/logger.service";

@Injectable()
export class AppInfoService {
  private serviceUrl = '/manage/info';

  constructor(private http: Http,
              private logger: Logger) {
  }

  findAppInfo(): Observable<AppInfo> {
    this.logger.debug('Finding app info');

    return this.http
      .request(this.serviceUrl)
      .map(response => JsonConvert.deserializeObject(response.json(), AppInfo))
      .catch(error => HttpUtility.logAndThrowError(this.logger, error));
  }
}

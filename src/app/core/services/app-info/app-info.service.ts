import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
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
      .map(request => AppInfo.fromDto(request.json()))
      .catch(error => HttpUtility.logAndThrowError(this.logger, error));
  }
}

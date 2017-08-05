import {inject, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";
import {NgIdleModule} from "@ng-idle/core";

import {AppInfoService} from "./app-info.service";
import {Logger} from "../logger.service/logger.service";
import {HttpUtility} from "../http-utility.service/http-utility";
import {BusyService} from "../busy.service/busy.service";
import {ToastyConfig, ToastyService} from "ng2-toasty";
import {AlertService} from "../alert.service/alert.service";
import {IdleService} from "../idle.service/idle.service";

describe('AppInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppInfoService,
        Logger,
        HttpUtility,
        AlertService,
        ToastyService,
        ToastyConfig,
        BusyService,
        IdleService
      ],
      imports: [
        HttpModule,
        NgIdleModule.forRoot()
      ]
    });
  });

  it('should be created', inject([AppInfoService], (service: AppInfoService) => {
    expect(service).toBeTruthy();
  }));
});

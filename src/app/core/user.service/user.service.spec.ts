import {inject, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";
import {NgIdleModule} from "@ng-idle/core";

import {UserService} from "./user.service";
import {Logger} from "../logger.service/logger.service";
import {HttpUtility} from "../http-utility.service/http-utility";
import {ToastyConfig, ToastyService} from "ng2-toasty";
import {AlertService} from "../alert.service/alert.service";
import {BusyService} from "../busy.service/busy.service";
import {IdleService} from "../idle.service/idle.service";

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
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

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});

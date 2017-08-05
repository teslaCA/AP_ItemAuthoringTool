import {async, TestBed} from "@angular/core/testing";
import {NgIdleModule} from "@ng-idle/core";

import {AppFooterComponent} from "./app-footer.component";
import {HttpModule} from "@angular/http";
import {AppInfoService} from "../core/app-info.service/app-info.service";
import {AlertService} from "../core/alert.service/alert.service";
import {ToastyConfig, ToastyService} from "ng2-toasty";
import {Logger} from "../core/logger.service/logger.service";
import {HttpUtility} from "../core/http-utility.service/http-utility";
import {BusyService} from "../core/busy.service/busy.service";
import {IdleService} from "../core/idle.service/idle.service";

describe('AppFooterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppFooterComponent
      ],
      imports: [
        HttpModule,
        NgIdleModule.forRoot()
      ],
      providers: [
        AppInfoService,
        Logger,
        HttpUtility,
        AlertService,
        ToastyService,
        ToastyConfig,
        BusyService,
        IdleService,
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const fixture = TestBed.createComponent(AppFooterComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

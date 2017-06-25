import {async, TestBed} from "@angular/core/testing";

import {FooterComponent} from "./footer.component";
import {HttpModule} from "@angular/http";
import {AppInfoService} from "../../../core/services/app-info/app-info.service";
import {AlertService} from "../../../core/services/alert/alert.service";
import {ToastyConfig, ToastyService} from "ng2-toasty";
import {Logger} from "../../../core/services/logger/logger.service";
import {HttpUtility} from "../../../core/services/http-utility/http-utility";
import {BusyService} from "../../../core/services/busy/busy.service";

describe('FooterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FooterComponent
      ],
      imports: [
        HttpModule
      ],
      providers: [
        AppInfoService,
        Logger,
        HttpUtility,
        AlertService,
        ToastyService,
        ToastyConfig,
        BusyService
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

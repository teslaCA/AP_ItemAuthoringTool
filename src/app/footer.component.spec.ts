import {async, TestBed} from "@angular/core/testing";

import {FooterComponent} from "./footer.component";
import {HttpModule} from "@angular/http";
import {AppInfoService} from "./core/app-info.service/app-info.service";
import {AlertService} from "./core/alert.service/alert.service";
import {ToastyConfig, ToastyService} from "ng2-toasty";
import {Logger} from "./core/logger.service/logger.service";

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
        AlertService,
        ToastyService,
        ToastyConfig,
        Logger
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

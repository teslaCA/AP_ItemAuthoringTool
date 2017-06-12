import {async, TestBed} from "@angular/core/testing";
import {APP_BASE_HREF} from "@angular/common";

import {HomeComponent} from "./home.component";
import {Logger} from "../service/logger.service";
import {AlertService} from "../service/alert.service";
import {AppModule} from "../app.module";

describe('HomeComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
      ],
      declarations: [
      ],
      providers: [
        Logger,
        AlertService,
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

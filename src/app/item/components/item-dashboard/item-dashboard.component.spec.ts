import {async, TestBed} from "@angular/core/testing";
import {APP_BASE_HREF} from "@angular/common";

import {ItemDashboardComponent} from "./item-dashboard.component";
import {Logger} from "../../../core/services/logger/logger.service";
import {AlertService} from "../../../core/services/alert/alert.service";
import {AppModule} from "../../../root/app.module";

describe('ItemDashboardComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AppModule
      ],
      providers: [
        Logger,
        AlertService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const fixture = TestBed.createComponent(ItemDashboardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

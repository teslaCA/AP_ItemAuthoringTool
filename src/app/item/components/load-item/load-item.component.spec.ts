import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {APP_BASE_HREF} from "@angular/common";
import {AppModule} from "../../../root/app.module";
import {Logger} from "../../../core/services/logger/logger.service";
import {AlertService} from "../../../core/services/alert/alert.service";
import { LoadItemComponent } from './load-item.component';
import {ItemModule} from "../../item.module";
import {ItemHistoryComponent} from "../item-history/item-history.component";

describe('LoadItemComponent', () => {
  let component: LoadItemComponent;
  let fixture: ComponentFixture<LoadItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      declarations: [
      ],
      providers: [
        Logger,
        AlertService,
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

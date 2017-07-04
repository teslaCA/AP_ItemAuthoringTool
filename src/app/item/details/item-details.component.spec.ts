import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {APP_BASE_HREF} from "@angular/common";
import {AppModule} from "../../app.module";
import {Logger} from "../../core/logger.service/logger.service";
import {AlertService} from "../../core/alert.service/alert.service";
import {ItemDetailsComponent} from "./item-details.component";

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      declarations: [],
      providers: [
        Logger,
        AlertService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

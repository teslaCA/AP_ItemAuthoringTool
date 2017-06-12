import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ItemLoadComponent} from "./item-load.component";
import {Logger} from "../../service/logger.service";
import {AlertService} from "../../service/alert.service";
import {AppModule} from "../../app.module";
import {APP_BASE_HREF} from "@angular/common";

describe('ItemLoadComponent', () => {
  let component: ItemLoadComponent;
  let fixture: ComponentFixture<ItemLoadComponent>;

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
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

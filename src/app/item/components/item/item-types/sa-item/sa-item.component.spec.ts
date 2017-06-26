import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {SaItemComponent} from "./sa-item.component";
import {Logger} from "../../../../../core/services/logger/logger.service";
import {AppModule} from "../../../../../root/app.module";
import {APP_BASE_HREF} from "@angular/common";

describe('SaItemComponent', () => {
  let component: SaItemComponent;
  let fixture: ComponentFixture<SaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      declarations: [],
      providers: [
        Logger,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

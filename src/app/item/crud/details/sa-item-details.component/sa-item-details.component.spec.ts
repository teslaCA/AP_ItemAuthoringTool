import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {SaItemDetailsComponent} from "./sa-item-details.component";
import {Logger} from "../../../../core/logger.service/logger.service";
import {AppModule} from "../../../../app.module";
import {APP_BASE_HREF} from "@angular/common";

describe('SaItemDetailsComponent', () => {
  let component: SaItemDetailsComponent;
  let fixture: ComponentFixture<SaItemDetailsComponent>;

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
    fixture = TestBed.createComponent(SaItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

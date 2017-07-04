import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {WerItemComponent} from "./wer-item.component";
import {Logger} from "../../../../../core/logger.service/logger.service";
import {AppModule} from "../../../../../root/app.module";
import {APP_BASE_HREF} from "@angular/common";

describe('WerItemComponent', () => {
  let component: WerItemComponent;
  let fixture: ComponentFixture<WerItemComponent>;

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
    fixture = TestBed.createComponent(WerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

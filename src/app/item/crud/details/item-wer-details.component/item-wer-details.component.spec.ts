import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ItemWerDetailsComponent} from "./item-wer-details.component";
import {APP_BASE_HREF} from "@angular/common";
import {AppModule} from "../../../../app.module";
import {Logger} from "../../../../core/logger.service/logger.service";

describe('WerItemDetailsComponent', () => {
  let component: ItemWerDetailsComponent;
  let fixture: ComponentFixture<ItemWerDetailsComponent>;

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
    fixture = TestBed.createComponent(ItemWerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

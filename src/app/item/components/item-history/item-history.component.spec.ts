import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {APP_BASE_HREF} from "@angular/common";

import {ItemHistoryComponent} from "./item-history.component";
import {AppModule} from "../../../root/app.module";
import {Logger} from "../../../core/services/logger/logger.service";
import {AlertService} from "../../../core/services/alert/alert.service";
import {ItemService} from "../../services/item/item.service";

describe('ItemHistoryComponent', () => {
  let component: ItemHistoryComponent;
  let fixture: ComponentFixture<ItemHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      declarations: [],
      providers: [
        Logger,
        AlertService,
        ItemService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

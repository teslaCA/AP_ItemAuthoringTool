import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {APP_BASE_HREF} from "@angular/common";

import {ItemHistoryTabComponent} from "./item-history-tab.component";
import {AppModule} from "../../../../app.module";
import {Logger} from "../../../../core/logger.service/logger.service";
import {AlertService} from "../../../../core/alert.service/alert.service";
import {ItemService} from "../../../services/item.service/item.service";

describe('ItemHistoryTabComponent', () => {
  let component: ItemHistoryTabComponent;
  let fixture: ComponentFixture<ItemHistoryTabComponent>;

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
    fixture = TestBed.createComponent(ItemHistoryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

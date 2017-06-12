import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemHistoryComponent} from './item-history.component';
import {AppModule} from "../../../app.module";
import {APP_BASE_HREF} from "@angular/common";
import {ItemModule} from "../../item.module";
import {Logger} from "../../../core/logger.service";
import {AlertService} from "../../../core/alert.service";
import {ItemService} from "../../services/item.service";

describe('ItemHistoryComponent', () => {
  let component: ItemHistoryComponent;
  let fixture: ComponentFixture<ItemHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        ItemModule
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

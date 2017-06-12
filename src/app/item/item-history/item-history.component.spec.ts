import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ItemHistoryComponent} from './item-history.component';
import {AppModule} from "../../app.module";
import {Logger} from "../../service/logger.service";
import {AlertService} from "../../service/alert.service";
import {ItemHistoryService} from "./item-history.service";
import {APP_BASE_HREF} from "@angular/common";

describe('ItemHistoryComponent', () => {
  let component: ItemHistoryComponent;
  let fixture: ComponentFixture<ItemHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
      ],
      declarations: [],
      providers: [
        Logger,
        AlertService,
        ItemHistoryService,
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

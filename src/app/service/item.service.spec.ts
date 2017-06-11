import {TestBed, inject} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {ItemService} from './item.service';
import {Logger} from "../core/logger.service";
import {AlertService} from "../core/alert.service";
import {ToastyModule} from "ng2-toasty";

describe('ItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        ToastyModule
      ],
      providers: [
        ItemService,
        Logger,
        AlertService
      ]
    });
  });

  it('should ...', inject([ItemService], (service: ItemService) => {
    expect(service).toBeTruthy();
  }));
});

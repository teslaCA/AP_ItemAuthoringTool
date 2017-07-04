import {inject, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";
import {ToastyConfig, ToastyModule, ToastyService} from "ng2-toasty";

import {ItemHistoryService} from "./item-history.service";
import {Logger} from "../../../core/logger.service/logger.service";
import {BusyService} from "../../../core/busy.service/busy.service";
import {AlertService} from "../../../core/alert.service/alert.service";
import {HttpUtility} from "../../../core/http-utility.service/http-utility";

describe('ItemHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        ToastyModule
      ],
      providers: [
        ItemHistoryService,
        Logger,
        HttpUtility,
        AlertService,
        ToastyService,
        ToastyConfig,
        BusyService
      ]
    });
  });

  it('should be created', inject([ItemHistoryService], (service: ItemHistoryService) => {
    expect(service).toBeTruthy();
  }));
});

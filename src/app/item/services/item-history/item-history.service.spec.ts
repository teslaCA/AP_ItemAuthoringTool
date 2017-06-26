import {inject, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";
import {ToastyConfig, ToastyModule, ToastyService} from "ng2-toasty";

import {ItemHistoryService} from "./item-history.service";
import {Logger} from "../../../core/services/logger/logger.service";
import {BusyService} from "../../../core/services/busy/busy.service";
import {AlertService} from "../../../core/services/alert/alert.service";
import {HttpUtility} from "../../../core/services/http-utility/http-utility";

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

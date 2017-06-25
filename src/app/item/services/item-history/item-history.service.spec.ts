import {inject, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";
import {ToastyModule} from "ng2-toasty";

import {ItemHistoryService} from "./item-history.service";
import {Logger} from "../../../core/services/logger/logger.service";

describe('ItemHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        ToastyModule
      ],
      providers: [
        ItemHistoryService,
        Logger
      ]
    });
  });

  it('should be created', inject([ItemHistoryService], (service: ItemHistoryService) => {
    expect(service).toBeTruthy();
  }));
});

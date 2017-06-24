import {inject, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";
import {ToastyModule} from "ng2-toasty";

import {ItemService} from "./item.service";
import {Logger} from "../../../core/services/logger/logger.service";

describe('ItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        ToastyModule
      ],
      providers: [
        ItemService,
        Logger
      ]
    });
  });

  it('should be created', inject([ItemService], (service: ItemService) => {
    expect(service).toBeTruthy();
  }));
});

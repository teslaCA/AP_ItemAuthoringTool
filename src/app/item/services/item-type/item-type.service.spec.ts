import {inject, TestBed} from "@angular/core/testing";

import {ItemTypeService} from "./item-type.service";
import {Logger} from "../../../core/services/logger/logger.service";

describe('ItemTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ItemTypeService,
        Logger
      ]
    });
  });

  it('should be created', inject([ItemTypeService], (service: ItemTypeService) => {
    expect(service).toBeTruthy();
  }));
});

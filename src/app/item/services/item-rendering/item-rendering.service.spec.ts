import { TestBed, inject } from '@angular/core/testing';
import {HttpModule} from "@angular/http";
import {ItemRenderingService} from './item-rendering.service';
import {HttpUtility} from "../../../core/services/http-utility/http-utility";
import {Logger} from "../../../core/services/logger/logger.service";
import {BusyService} from "../../../core/services/busy/busy.service";
import {AlertService} from "../../../core/services/alert/alert.service";
import {ToastyConfig, ToastyModule, ToastyService} from "ng2-toasty";

describe('ItemRenderingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        ToastyModule
      ],
      providers: [
        ItemRenderingService,
        HttpUtility,
        Logger,
        BusyService,
        AlertService,
        ToastyConfig,
        ToastyService
      ]
    });
  });

  it('should be created', inject([ItemRenderingService], (service: ItemRenderingService) => {
    expect(service).toBeTruthy();
  }));
});

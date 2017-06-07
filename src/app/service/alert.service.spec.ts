import {inject, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";
import {Logger} from "./logger.service";
import {AlertService} from "./alert.service";
import {ToastyModule} from "ng2-toasty";

describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        ToastyModule
      ],
      providers: [
        AlertService,
        Logger
      ]
    });
  });

  it('should ...', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));
});

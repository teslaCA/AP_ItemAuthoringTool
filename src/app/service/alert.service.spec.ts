import {inject, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";
import {Logger} from "../utility/logger";
import {AlertService} from "./alert.service";

describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
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

import {inject, TestBed} from "@angular/core/testing";
import {AlertService} from "./alert.service";
import {ToastyModule} from "ng2-toasty";

describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastyModule
      ],
      providers: [
        AlertService
      ]
    });
  });

  it('should ...', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));
});

import {inject, TestBed} from "@angular/core/testing";
import {ToastyModule} from "ng2-toasty";

import {AlertService} from "./alert.service";

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

  it('should be created', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));
});

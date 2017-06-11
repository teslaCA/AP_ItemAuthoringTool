import {inject, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";

import {BuildInfoService} from "./build-info.service";

describe('BuildInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BuildInfoService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([BuildInfoService], (service: BuildInfoService) => {
    expect(service).toBeTruthy();
  }));
});

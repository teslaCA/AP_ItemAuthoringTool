import {inject, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";

import {AppInfoService} from "./app-info.service";

describe('AppInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppInfoService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([AppInfoService], (service: AppInfoService) => {
    expect(service).toBeTruthy();
  }));
});

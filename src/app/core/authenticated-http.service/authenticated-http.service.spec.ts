import { TestBed, inject } from '@angular/core/testing';

import { AuthenticatedHttpService } from './authenticated-http.service';
import {CoreModule} from "../core.module";
import {ToastyConfig, ToastyService} from "ng2-toasty";

describe('AuthenticatedHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule
      ],
      providers: [
        AuthenticatedHttpService,
        ToastyService,
        ToastyConfig
      ]
    });
  });

  it('should be created', inject([AuthenticatedHttpService], (service: AuthenticatedHttpService) => {
    expect(service).toBeTruthy();
  }));
});

import {inject, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";

import {UserService} from "./user.service";
import {Logger} from "../logger/logger.service";

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        Logger
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});

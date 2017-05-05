import { TestBed, inject } from '@angular/core/testing';
import {Http, HttpModule} from '@angular/http';

import { LookupService } from './lookup.service';

describe('LookupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LookupService],
      imports: [
        HttpModule
      ]
    });
  });

  it('should ...', inject([LookupService], (service: LookupService) => {
    expect(service).toBeTruthy();
  }));
});

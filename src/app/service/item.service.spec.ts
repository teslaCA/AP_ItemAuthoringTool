import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ItemService } from './item.service';
import {Logger} from "../utility/logger";

describe('ItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        ItemService,
        Logger
      ]
    });
  });

  it('should ...', inject([ItemService], (service: ItemService) => {
    expect(service).toBeTruthy();
  }));
});

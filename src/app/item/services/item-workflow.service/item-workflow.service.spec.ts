import { TestBed, inject } from '@angular/core/testing';

import { ItemWorkflowService } from './item-workflow.service';

describe('ItemWorkflowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemWorkflowService]
    });
  });

  it('should be created', inject([ItemWorkflowService], (service: ItemWorkflowService) => {
    expect(service).toBeTruthy();
  }));
});

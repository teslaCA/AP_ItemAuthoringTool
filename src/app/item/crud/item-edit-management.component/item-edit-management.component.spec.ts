import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSectionManagementComponent } from './item-section-management.component';

describe('ItemSectionManagementComponent', () => {
  let component: ItemSectionManagementComponent;
  let fixture: ComponentFixture<ItemSectionManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSectionManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSectionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

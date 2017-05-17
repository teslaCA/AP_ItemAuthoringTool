import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRedirectComponent } from './item-redirect.component';

describe('ItemRedirectComponent', () => {
  let component: ItemRedirectComponent;
  let fixture: ComponentFixture<ItemRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

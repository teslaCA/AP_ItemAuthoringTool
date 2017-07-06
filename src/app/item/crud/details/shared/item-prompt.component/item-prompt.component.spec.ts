import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPromptComponent } from './item-prompt.component';

describe('ItemPromptComponent', () => {
  let component: ItemPromptComponent;
  let fixture: ComponentFixture<ItemPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

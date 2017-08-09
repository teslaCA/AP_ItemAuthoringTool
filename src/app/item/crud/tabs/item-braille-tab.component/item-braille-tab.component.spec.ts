import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBrailleTabComponent } from './item-braille-tab.component';

describe('ItemBrailleTabComponent', () => {
  let component: ItemBrailleTabComponent;
  let fixture: ComponentFixture<ItemBrailleTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemBrailleTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBrailleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

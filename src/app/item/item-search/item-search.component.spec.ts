import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {Logger} from "../../utility/logger";
import {ItemSearchComponent} from './item-search.component';

describe('ItemSearchComponent', () => {
  let component: ItemSearchComponent;
  let fixture: ComponentFixture<ItemSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ItemSearchComponent
      ],
      providers: [
        Logger
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

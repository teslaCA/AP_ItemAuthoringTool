import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemSelectComponent } from './item-select.component';

describe('ItemSelectComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSelectComponent ],
      imports: [HttpModule, RouterTestingModule]
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(ItemSelectComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

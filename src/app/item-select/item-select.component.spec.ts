import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ItemSelectComponent } from './item-select.component';

describe('ItemSelectComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemSelectComponent ],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(ItemSelectComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

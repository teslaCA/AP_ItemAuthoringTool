import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeBarComponent } from './home-bar.component';

describe('HomeBarComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBarComponent ],
      imports: [HttpModule, RouterTestingModule]
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeBarComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

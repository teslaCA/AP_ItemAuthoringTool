/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LogOutComponent } from './logout.component';

describe('LogOutComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogOutComponent ],
      imports: [
        NgbModule.forRoot()
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(LogOutComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});

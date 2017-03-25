/* tslint:disable:no-unused-variable */

import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {HomeModule} from './home';
import {HeaderModule} from './header/header.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      imports: [
        FormsModule,
        HttpModule,
        HomeModule,
        HeaderModule,
        RouterModule.forRoot([]),
        NgbModule.forRoot()
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    // expect(app).toBeFalsy();
  });

});

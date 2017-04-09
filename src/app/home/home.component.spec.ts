/*
 * Copyright 2017 Regents of the University of California. Licensed under the Educational Community License, Version
 * 2.0 (the "license"); you may not use this file except in compliance with the License. You may obtain a copy of the
 * license at
 *
 * https://opensource.org/licenses/ECL-2.0
 *
 * Unless required under applicable law or agreed to in writing, software distributed under the License is distributed
 * in an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for
 * specific language governing permissions and limitations under the license.
 */

/* tslint:disable:no-unused-variable */
import {BrowserModule} from '@angular/platform-browser';
import { async, TestBed } from '@angular/core/testing';
import {HttpModule} from '@angular/http';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [HttpModule]
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});

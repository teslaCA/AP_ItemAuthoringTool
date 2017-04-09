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
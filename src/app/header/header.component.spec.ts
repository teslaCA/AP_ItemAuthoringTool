/*
 * Copyright 2017 Regents of the University of California.
 *
 * Licensed under the Educational Community License, Version 2.0 (the "license");
 * you may not use this file except in compliance with the License. You may
 * obtain a copy of the license at
 *
 * https://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from './header.component';
import { LogOutComponent } from './log-out/logout.component';
import { ConfirmService, ConfirmState, ConfirmModalComponent } from '../confirm-modal/confirm-modal';
describe('HeaderComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        LogOutComponent,
        ConfirmModalComponent
      ],
      imports: [
        HttpModule,
        NgbModule.forRoot()
      ],
      providers: [
        ConfirmService,
        ConfirmState
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});

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

import {Component} from '@angular/core';
import { ConfirmService } from '../.././confirm-modal/confirm-modal';

@Component({
  selector: 'app-logout',
  templateUrl: 'logout.component.html'
})
export class LogOutComponent {

  constructor(
    private confirmService: ConfirmService
  ) { }

  logOut() {
    this.confirmService.confirm({ title: 'Log out?', message: 'Are you sure you want to log out?' }).then(
      () => {
        console.log('logging out...');
        window.location.href = '/saml/logout';
      },
      () => {
        console.log('not deleting...');
      });
  }
}

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

import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {LookupService} from '../service/lookup.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.less'],
  providers: [LookupService]
})

export class HeaderComponent  {
  public isCollapsed = true;

  public user: any;

  constructor(private lookupService: LookupService) {
    this.lookupService.getUser()
      .subscribe((res: Response) => {
        this.user = res.json();
      });
  }

  logOut() {
    console.log('logging out...');
    window.location.href = '/saml/logout';
  }
}

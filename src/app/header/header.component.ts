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

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Http, Response} from '@angular/http';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-header',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  providers: [UserService]
})
export class HeaderComponent {

  public isCollapsed = true;

  public user: any;

  private errorMessage: String;

  constructor(private userService: UserService) {
    this.userService.getUser()
      .subscribe((res: Response) => {
        this.user = res.json();
      });
  }

}

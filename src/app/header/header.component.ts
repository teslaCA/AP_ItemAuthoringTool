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
import {Component} from "@angular/core";
import {Response} from "@angular/http";
import {Logger} from "../core/logger.service";
import {UserService} from "../core/user.service";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  public user: any;  // TODO: Strongly type

  constructor(private logger: Logger,
              private userService: UserService) {
    this.userService.findCurrentUser()
      .subscribe((res: Response) => {
        this.user = res.json();
      });
  }

  logOut(): void {
    this.logger.debug('logging out...');
    window.location.href = '/saml/logout';
  }
}

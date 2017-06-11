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
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Logger} from "../core/logger.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  private action = '';

  private id: number;

  private itemUrl = '';

  private itemLink = '';

  get showLink(): boolean {
    if (this.action === 'create' || this.action === 'commit') {
      return true;
    }
    return false;
  }

  constructor(private logger: Logger,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.action = params['action'];
        this.id = params['id'];
      });

    this.logger.debug('action: ' + this.action);
    this.logger.debug('id: ' + this.id);

    if (this.action !== '') {
      this.itemUrl = '/item/' + this.id;
      switch (this.action) {
        case 'create' : {
          this.itemLink = 'View New Created Item';
          break;
        }
        case 'commit' : {
          this.itemLink = 'View Last Edited Item';
          break;
        }
      }
    }
  }

}

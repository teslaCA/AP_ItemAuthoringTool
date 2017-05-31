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
import {LookupService} from "../service/lookup.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
  providers: [LookupService]
})
export class FooterComponent {
  private _buildInfo: any;
  get buildInfo(): any {
    return this._buildInfo;
  }

  constructor(private lookupService: LookupService) {
    this.lookupService.getBuildInfo()
      .subscribe((res: Response) => {
          this._buildInfo = res.json();
        },
        () => {
          this._buildInfo = '';
        });
  }
}

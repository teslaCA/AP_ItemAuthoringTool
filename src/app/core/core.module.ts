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
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {AlertService} from "./alert.service";
import {Logger} from "./logger.service";
import {BuildInfoService} from "./build-info.service";
import {ItemService} from "./item.service";
import {ItemTypeService} from "./item-type.service";
import {UserService} from "./user.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AlertService,
    BuildInfoService,
    ItemService,
    ItemTypeService,
    Logger,
    UserService
  ]
})
export class CoreModule {
}

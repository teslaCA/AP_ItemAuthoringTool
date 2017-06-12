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
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {Ng2BootstrapModule} from "ngx-bootstrap/ng2-bootstrap";

import {AppRoutingModule} from "./app.routing";
import {AppComponent} from "./app.component";
import {ToastyModule} from "ng2-toasty";
import {AngularSplitModule} from "angular-split";

import {ResourceNotFoundComponent} from "./resource-not-found.component";
import {HeaderComponent} from "./header.component";
import {FooterComponent} from "./footer.component";
import {CoreModule} from "./core/core.module";
import {ItemModule} from "./item/item.module";
import {SharedModule} from "./shared/shared.module";


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ResourceNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ItemModule,
    CoreModule,
    Ng2BootstrapModule.forRoot(),
    SharedModule,
    ToastyModule.forRoot()
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}


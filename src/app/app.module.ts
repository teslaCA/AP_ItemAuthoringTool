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

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LogOutComponent } from './header/log-out/logout.component';
import { FooterComponent } from './footer/footer.component';
import { ItemSelectTypeComponent } from './item/item-create/item-select-type/item-select-type.component';
import { HomeComponent } from './home/home.component';
import { ItemCreateComponent } from './item/item-create/item-create.component';
import { ItemLoadSaComponent } from './item/item-load-sa/item-load-sa.component';
import { ConfirmModalComponent, ConfirmService,
         ConfirmState, ConfirmTemplateDirective } from './confirm-modal/confirm-modal';
import { ItemLoadComponent } from './item/item-load/item-load.component';
import { ItemRedirectComponent } from './item/item-redirect/item-redirect.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LogOutComponent,
    HomeComponent,
    ItemSelectTypeComponent,
    ItemCreateComponent,
    ItemLoadSaComponent,
    ConfirmModalComponent,
    ConfirmTemplateDirective,
    ItemLoadComponent,
    ItemRedirectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    ConfirmService,
    ConfirmState
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

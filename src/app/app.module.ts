import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ModalModule} from "ngx-bootstrap/modal";
import {AlertModule} from "ngx-bootstrap/alert";
import {Ng2BootstrapModule} from "ngx-bootstrap/ng2-bootstrap";

import {AppRoutingModule} from "./app.routing";
import {AppComponent} from "./app.component";
import {ItemSelectTypeComponent} from "./item/item-create/item-select-type/item-select-type.component";
import {ItemCreateComponent} from "./item/item-create/item-create.component";
import {ItemLoadSaComponent} from "./item/item-load-sa/item-load-sa.component";
import {ItemLoadComponent} from "./item/item-load/item-load.component";
import {ItemRedirectComponent} from "./item/item-redirect/item-redirect.component";
import {NotFoundComponent} from "./shared/not-found/not-found.component";
import {ToastyModule} from "ng2-toasty";
import {ItemSearchComponent} from "./item/item-search/item-search.component";
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {DashboardComponent} from "./item/dashboard/dashboard.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ItemCreateComponent,
    ItemLoadSaComponent,
    ItemLoadComponent,
    ItemRedirectComponent,
    ItemSearchComponent,
    ItemSelectTypeComponent
  ],
  imports: [
    AlertModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    CoreModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    Ng2BootstrapModule.forRoot(),
    ReactiveFormsModule,
    SharedModule,
    ToastyModule.forRoot(),
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}

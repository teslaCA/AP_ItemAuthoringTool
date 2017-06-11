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
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {ItemSelectTypeComponent} from "./item/item-create/item-select-type/item-select-type.component";
import {HomeComponent} from "./home/home.component";
import {ItemCreateComponent} from "./item/item-create/item-create.component";
import {ItemLoadSaComponent} from "./item/item-load-sa/item-load-sa.component";
import {ItemLoadComponent} from "./item/item-load/item-load.component";
import {ItemRedirectComponent} from "./item/item-redirect/item-redirect.component";
import {NoRouteComponent} from "./no-route/no-route.component";
import {Logger} from "./core/logger.service";
import {ToastyModule} from "ng2-toasty";
import {AlertService} from "./core/alert.service";
import {ItemSearchComponent} from './item/item-search/item-search.component';
import {CoreModule} from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ItemCreateComponent,
    ItemLoadSaComponent,
    ItemLoadComponent,
    ItemRedirectComponent,
    ItemSearchComponent,
    ItemSelectTypeComponent,
    NoRouteComponent,
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
    ToastyModule.forRoot(),
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}

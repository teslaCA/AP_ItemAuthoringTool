import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ItemSelectTypeComponent} from "./components/item-create/item-select-type/item-select-type.component";
import {ItemSearchComponent} from "./components/item-search/item-search.component";
import {ItemRedirectComponent} from "./components/item-redirect/item-redirect.component";
import {ItemLoadComponent} from "./components/item-load/item-load.component";
import {ItemLoadSaComponent} from "./components/item-load-sa/item-load-sa.component";
import {ItemCreateComponent} from "./components/item-create/item-create.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ReactiveFormsModule} from "@angular/forms";
import {Ng2BootstrapModule} from "ngx-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    Ng2BootstrapModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  declarations: [
    DashboardComponent,
    ItemCreateComponent,
    ItemLoadSaComponent,
    ItemLoadComponent,
    ItemRedirectComponent,
    ItemSearchComponent,
    ItemSelectTypeComponent
  ],
  exports: [
    DashboardComponent,
    ItemCreateComponent,
    ItemLoadSaComponent,
    ItemLoadComponent,
    ItemRedirectComponent,
    ItemSearchComponent,
    ItemSelectTypeComponent
  ]
})
export class ItemModule {
}

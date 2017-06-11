import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ItemSelectTypeComponent} from "./item-create/item-select-type/item-select-type.component";
import {ItemSearchComponent} from "./item-search/item-search.component";
import {ItemRedirectComponent} from "./item-redirect/item-redirect.component";
import {ItemLoadComponent} from "./item-load/item-load.component";
import {ItemLoadSaComponent} from "./item-load-sa/item-load-sa.component";
import {ItemCreateComponent} from "./item-create/item-create.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ReactiveFormsModule} from "@angular/forms";
import {Ng2BootstrapModule} from "ngx-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
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

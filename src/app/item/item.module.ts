import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CreateItemSelectTypeComponent} from "./components/create-item-select-type/create-item-select-type.component";
import {FindItemComponent} from "./components/find-item/find-item.component";
import {LoadItemRedirectComponent} from "./components/load-item-redirect/load-item-redirect.component";
import {LoadItemComponent} from "./components/load-item/load-item.component";
import {LoadSaItemComponent} from "./components/load-sa-item/load-sa-item.component";
import {CreateItemComponent} from "./components/create-item/create-item.component";
import {ItemDashboardComponent} from "./components/item-dashboard/item-dashboard.component";
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
    ItemDashboardComponent,
    CreateItemComponent,
    LoadSaItemComponent,
    LoadItemComponent,
    LoadItemRedirectComponent,
    FindItemComponent,
    CreateItemSelectTypeComponent
  ],
  exports: [
    ItemDashboardComponent,
    CreateItemComponent,
    LoadSaItemComponent,
    LoadItemComponent,
    LoadItemRedirectComponent,
    FindItemComponent,
    CreateItemSelectTypeComponent
  ]
})
export class ItemModule {
}

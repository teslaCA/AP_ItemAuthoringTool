import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CreateItemSelectTypeComponent} from "./components/create-item-select-type/create-item-select-type.component";
import {FindItemComponent} from "./components/find-item/find-item.component";
import {LoadItemRedirectComponent} from "./components/load-item-redirect/load-item-redirect.component";
import {LoadItemComponent} from "./components/load-item/load-item.component";
import {LoadSaItemComponent} from "./components/load-sa-item/load-sa-item.component";
import {LoadWerItemComponent} from "./components/load-wer-item/load-wer-item.component";
import {ItemDashboardComponent} from "./components/item-dashboard/item-dashboard.component";
import {ReactiveFormsModule} from "@angular/forms";
import {Ng2BootstrapModule} from "ngx-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {Http, HttpModule} from "@angular/http";
import {ItemHistoryComponent} from "./components/item-history/item-history.component";
import {ItemAutoSaveComponent } from './components/item-auto-save/item-auto-save.component';
import {AuthenticatedHttpService} from "../core/authenticated-http.service/authenticated-http.service";

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    Ng2BootstrapModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ItemDashboardComponent,
    LoadSaItemComponent,
    LoadWerItemComponent,
    LoadItemComponent,
    LoadItemRedirectComponent,
    FindItemComponent,
    CreateItemSelectTypeComponent,
    ItemHistoryComponent,
    ItemAutoSaveComponent
  ],
  exports: [
    ItemDashboardComponent,
    LoadSaItemComponent,
    LoadWerItemComponent,
    LoadItemComponent,
    LoadItemRedirectComponent,
    FindItemComponent,
    CreateItemSelectTypeComponent,
    ItemHistoryComponent
  ],
  providers: [
    {provide: Http, useClass: AuthenticatedHttpService}
  ]
})
export class ItemModule {
}

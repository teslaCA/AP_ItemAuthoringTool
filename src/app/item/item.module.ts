import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CreateItemSelectTypeComponent} from "./components/item-dashboard/create-item-select-type/create-item-select-type.component";
import {FindItemComponent} from "./components/item-dashboard/find-item/find-item.component";
import {ItemRedirectComponent} from "./components/item/item-redirect/item-redirect.component";
import {ItemComponent} from "./components/item/item.component";
import {SaItemComponent} from "./components/item/item-types/sa-item/sa-item.component";
import {WerItemComponent} from "./components/item/item-types/wer-item/wer-item.component";
import {ItemDashboardComponent} from "./components/item-dashboard/item-dashboard.component";
import {ReactiveFormsModule} from "@angular/forms";
import {Ng2BootstrapModule} from "ngx-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {Http, HttpModule} from "@angular/http";
import {ItemHistoryComponent} from "./components/item/item-details/item-history/item-history.component";
import {ItemAutoSaveComponent } from './components/item/item-auto-save/item-auto-save.component';
import {AuthenticatedHttpService} from "../core/services/authenticated-http/authenticated-http.service";
import {ItemHistoryService} from "./services/item-history/item-history.service";
import {ItemService} from "./services/item/item.service";
import { PromptComponent } from './components/item/shared/prompt/prompt.component';

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
    SaItemComponent,
    WerItemComponent,
    ItemComponent,
    ItemRedirectComponent,
    FindItemComponent,
    CreateItemSelectTypeComponent,
    ItemHistoryComponent,
    ItemAutoSaveComponent,
    PromptComponent
  ],
  exports: [
    ItemDashboardComponent,
    SaItemComponent,
    WerItemComponent,
    ItemComponent,
    ItemRedirectComponent,
    FindItemComponent,
    CreateItemSelectTypeComponent,
    ItemHistoryComponent
  ],
  providers: [
    {provide: Http, useClass: AuthenticatedHttpService},
    ItemService,
    ItemHistoryService
  ]
})
export class ItemModule {
}

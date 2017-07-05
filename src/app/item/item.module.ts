import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CreateItemComponent} from "./dashboard/create-item.component/create-item.component";
import {FindItemComponent} from "./dashboard/find-item.component/find-item.component";
import {ItemRedirectComponent} from "./crud/item-redirect.component/item-redirect.component";
import {ItemCrudComponent} from "./crud/item-crud.component";
import {SaItemDetailsComponent} from "./crud/details/sa-item-details.component/sa-item-details.component";
import {WerItemDetailsComponent} from "./crud/details/wer-item-details.component/wer-item-details.component";
import {ItemDashboardComponent} from "./dashboard/item-dashboard.component";
import {ReactiveFormsModule} from "@angular/forms";
import {Ng2BootstrapModule} from "ngx-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {Http, HttpModule} from "@angular/http";
import {ItemHistoryTabComponent} from "./crud/tabs/item-history-tab.component/item-history-tab.component";
import {ItemAutoSaveComponent} from "./crud/item-auto-save.component/item-auto-save.component";
import {AuthenticatedHttpService} from "../core/authenticated-http.service/authenticated-http.service";
import {ItemHistoryService} from "./services/item-history.service/item-history.service";
import {ItemService} from "./services/item.service/item.service";
import {StimItemDetailsComponent} from "./crud/details/stim-item-details.component/stim-item-details.component";
import {ItemTabsComponent} from "./crud/tabs/item-tabs.component";
import {ItemStimulusTabComponent} from './crud/tabs/item-stimulus-tab.component/item-stimulus-tab.component';
import {ItemPreviewComponent} from './crud/item-preview.component/item-preview.component';
import {ItemPreviewService} from "./services/item-preview.service/item-preview.service";
import {ItemDetailsComponent} from "./crud/details/item-details.component";

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
    SaItemDetailsComponent,
    WerItemDetailsComponent,
    StimItemDetailsComponent,
    ItemCrudComponent,
    ItemRedirectComponent,
    FindItemComponent,
    CreateItemComponent,
    ItemHistoryTabComponent,
    ItemAutoSaveComponent,
    ItemTabsComponent,
    ItemStimulusTabComponent,
    ItemPreviewComponent,
    ItemDetailsComponent
  ],
  exports: [
    ItemDashboardComponent,
    SaItemDetailsComponent,
    WerItemDetailsComponent,
    StimItemDetailsComponent,
    ItemCrudComponent,
    ItemRedirectComponent,
    FindItemComponent,
    CreateItemComponent,
    ItemHistoryTabComponent,
    ItemDetailsComponent
  ],
  providers: [
    {provide: Http, useClass: AuthenticatedHttpService},
    ItemService,
    ItemHistoryService,
    ItemPreviewService
  ]
})
export class ItemModule {
}

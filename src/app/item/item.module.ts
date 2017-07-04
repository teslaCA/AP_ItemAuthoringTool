import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CreateItemComponent} from "./dashboard/create-item.component/create-item.component";
import {FindItemComponent} from "./dashboard/find-item.component/find-item.component";
import {ItemRedirectComponent} from "./details/item-redirect.component/item-redirect.component";
import {ItemDetailsComponent} from "./details/item-details.component";
import {SaItemComponent} from "./details/types/sa-item.component/sa-item.component";
import {WerItemComponent} from "./details/types/wer-item.component/wer-item.component";
import {ItemDashboardComponent} from "./dashboard/item-dashboard.component";
import {ReactiveFormsModule} from "@angular/forms";
import {Ng2BootstrapModule} from "ngx-bootstrap";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {Http, HttpModule} from "@angular/http";
import {ItemHistoryTabComponent} from "./details/tabs/item-history-tab.component/item-history-tab.component";
import {ItemAutoSaveComponent} from "./details/item-auto-save.component/item-auto-save.component";
import {AuthenticatedHttpService} from "../core/authenticated-http.service/authenticated-http.service";
import {ItemHistoryService} from "./services/item-history.service/item-history.service";
import {ItemService} from "./services/item.service/item.service";
import {StimItemComponent} from "./details/types/stim-item.component/stim-item.component";
import {ItemTabsComponent} from "./details/tabs/item-tabs.component";
import {ItemStimulusTabComponent} from './details/tabs/item-stimulus-tab.component/item-stimulus-tab.component';
import {ItemPreviewComponent} from './details/item-preview.component/item-preview.component';
import {ItemPreviewService} from "./services/item-preview.service/item-preview.service";

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
    StimItemComponent,
    ItemDetailsComponent,
    ItemRedirectComponent,
    FindItemComponent,
    CreateItemComponent,
    ItemHistoryTabComponent,
    ItemAutoSaveComponent,
    ItemTabsComponent,
    ItemStimulusTabComponent,
    ItemPreviewComponent
  ],
  exports: [
    ItemDashboardComponent,
    SaItemComponent,
    WerItemComponent,
    StimItemComponent,
    ItemDetailsComponent,
    ItemRedirectComponent,
    FindItemComponent,
    CreateItemComponent,
    ItemHistoryTabComponent
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

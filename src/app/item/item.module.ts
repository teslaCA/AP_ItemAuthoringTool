import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ItemCreateComponent} from "./dashboard/item-create.component/item-create.component";
import {ItemSearchComponent} from "./dashboard/item-search.component/item-search.component";
import {ItemCrudComponent} from "./crud/item-crud.component";
import {ItemSaDetailsComponent} from "./crud/details/item-sa-details.component/item-sa-details.component";
import {ItemWerDetailsComponent} from "./crud/details/item-wer-details.component/item-wer-details.component";
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
import {ItemStimDetailsComponent} from "./crud/details/item-stim-details.component/item-stim-details.component";
import {ItemTabsComponent} from "./crud/tabs/item-tabs.component";
import {ItemStimulusTabComponent} from "./crud/tabs/item-stimulus-tab.component/item-stimulus-tab.component";
import {ItemPreviewComponent} from "./crud/item-preview.component/item-preview.component";
import {ItemPreviewService} from "./services/item-preview.service/item-preview.service";
import {ItemDetailsComponent} from "./crud/details/item-details.component";
import {ItemLabeledTextAreaComponent} from "./crud/details/shared/item-labeled-textarea.component/item-labeled-textarea.component";

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
    ItemSaDetailsComponent,
    ItemWerDetailsComponent,
    ItemStimDetailsComponent,
    ItemCrudComponent,
    ItemSearchComponent,
    ItemCreateComponent,
    ItemHistoryTabComponent,
    ItemAutoSaveComponent,
    ItemTabsComponent,
    ItemStimulusTabComponent,
    ItemPreviewComponent,
    ItemDetailsComponent,
    ItemLabeledTextAreaComponent
  ],
  exports: [
    ItemDashboardComponent,
    ItemSaDetailsComponent,
    ItemWerDetailsComponent,
    ItemStimDetailsComponent,
    ItemCrudComponent,
    ItemSearchComponent,
    ItemCreateComponent,
    ItemHistoryTabComponent,
    ItemDetailsComponent,
    ItemLabeledTextAreaComponent
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

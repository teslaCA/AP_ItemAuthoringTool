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
import {FileUploadModule} from 'ng2-file-upload';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {Http, HttpModule} from "@angular/http";
import {ItemHistoryTabComponent} from "./crud/tabs/item-history-tab.component/item-history-tab.component";
import {ItemValidationTabComponent} from "./crud/tabs/item-validation-tab.component/item-validation-tab.component";
import {ItemAutoSaveComponent} from "./crud/item-auto-save.component/item-auto-save.component";
import {AuthenticatedHttpService} from "../core/authenticated-http.service/authenticated-http.service";
import {ItemHistoryService} from "./services/item-history.service/item-history.service";
import {ItemService} from "./services/item.service/item.service";
import {ItemStimDetailsComponent} from "./crud/details/item-stim-details.component/item-stim-details.component";
import {ItemTabsComponent} from "./crud/tabs/item-tabs.component";
import {ItemPreviewComponent} from "./crud/item-preview.component/item-preview.component";
import {ItemPreviewService} from "./services/item-preview.service/item-preview.service";
import {ItemDetailsComponent} from "./crud/details/item-details.component";
import {ItemPromptComponent} from "./crud/details/shared/item-prompt.component/item-prompt.component";
import {ItemWorkflowTabComponent} from "./crud/tabs/item-workflow-tab.component/item-workflow-tab.component";
import {ItemWorkflowService} from "./services/item-workflow.service/item-workflow.service";
import {ItemMcDetailsComponent} from "./crud/details/item-mc-details.component/item-mc-details.component";
import {ItemMsDetailsComponent} from "./crud/details/item-ms-details.component/item-ms-details.component";
import {ItemMcOptionsComponent} from "./crud/details/shared/item-mc-options.component/item-mc-options.component";
import {ItemMsOptionsComponent} from "./crud/details/shared/item-ms-options.component/item-ms-options.component";
import {ItemExemplarResponsesComponent} from "./crud/details/shared/item-exemplar-responses.component/item-exemplar-responses.component";
import {ItemTutDetailsComponent} from './crud/details/item-tut-details.component/item-tut-details.component';
import {ItemEbsrDetailsComponent} from './crud/details/item-ebsr-details/item-ebsr-details.component';
import {ItemAssociationTabComponent} from './crud/tabs/item-association-tab.component/item-association-tab.component';
import {ItemBrailleTabComponent} from './crud/tabs/item-braille-tab.component/item-braille-tab.component';
import {CKEditorModule} from 'ng2-ckeditor';
import {ItemValidationService} from "./services/item-validation.service/item-validation.service";
import {ItemTiDetailsComponent} from "./crud/details/item-ti-details.component/item-ti-details.component";
import {ItemTiTableComponent} from "./crud/details/shared/item-ti-table.component/item-ti-table.component";

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    Ng2BootstrapModule,
    ReactiveFormsModule,
    RouterModule,
    FileUploadModule,
    CKEditorModule
  ],
  declarations: [
    ItemDashboardComponent,
    ItemMcDetailsComponent,
    ItemMsDetailsComponent,
    ItemSaDetailsComponent,
    ItemTiDetailsComponent,
    ItemWerDetailsComponent,
    ItemStimDetailsComponent,
    ItemCrudComponent,
    ItemSearchComponent,
    ItemCreateComponent,
    ItemHistoryTabComponent,
    ItemValidationTabComponent,
    ItemAutoSaveComponent,
    ItemTabsComponent,
    ItemPreviewComponent,
    ItemDetailsComponent,
    ItemExemplarResponsesComponent,
    ItemPromptComponent,
    ItemTiTableComponent,
    ItemMcOptionsComponent,
    ItemMsOptionsComponent,
    ItemWorkflowTabComponent,
    ItemTutDetailsComponent,
    ItemEbsrDetailsComponent,
    ItemAssociationTabComponent,
    ItemBrailleTabComponent
  ],
  exports: [
    ItemDashboardComponent,
    ItemMcDetailsComponent,
    ItemSaDetailsComponent,
    ItemTiDetailsComponent,
    ItemWerDetailsComponent,
    ItemStimDetailsComponent,
    ItemCrudComponent,
    ItemSearchComponent,
    ItemCreateComponent,
    ItemHistoryTabComponent,
    ItemValidationTabComponent,
    ItemDetailsComponent,
    ItemPromptComponent,
    ItemTiTableComponent,
    ItemExemplarResponsesComponent,
    ItemMcOptionsComponent,
    ItemMsOptionsComponent
  ],
  providers: [
    {provide: Http, useClass: AuthenticatedHttpService},
    ItemService,
    ItemHistoryService,
    ItemValidationService,
    ItemPreviewService,
    ItemWorkflowService
  ]
})
export class ItemModule {
}

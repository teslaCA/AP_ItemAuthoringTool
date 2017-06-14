import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {AlertService} from "./alert.service";
import {Logger} from "./logger.service";
import {BuildInfoService} from "./build-info.service";
import {ItemService} from "../item/services/item.service";
import {ItemTypeService} from "../item/services/item-type.service";
import {UserService} from "./user.service";
import {HttpModule} from "@angular/http";
import {AlertModule} from "ngx-bootstrap";
import {BusyService} from "./busy.service/busy.service";
import {BusyOverlayComponent} from "./busy.service/busy-overlay.component";

@NgModule({
  declarations: [
    BusyOverlayComponent
  ],
  exports: [
    BusyOverlayComponent
  ],
  imports: [
    AlertModule,
    CommonModule,
    HttpModule
  ],
  providers: [
    AlertService,
    BuildInfoService,
    ItemService,
    ItemTypeService,
    BusyService,
    Logger,
    UserService
  ]
})
export class CoreModule {
}

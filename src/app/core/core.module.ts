import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {AlertService} from "./alert.service/alert.service";
import {Logger} from "./logger.service/logger.service";
import {ItemService} from "../item/services/item.service";
import {ItemTypeService} from "../item/services/item-type.service/item-type.service";
import {UserService} from "./user.service/user.service";
import {HttpModule} from "@angular/http";
import {AlertModule} from "ngx-bootstrap";
import {BusyService} from "./busy.service/busy.service";
import {BusyOverlayComponent} from "./busy.service/busy-overlay.component";
import {AppInfoService} from "./app-info.service/app-info.service";

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
    AppInfoService,
    ItemService,
    ItemTypeService,
    BusyService,
    Logger,
    UserService
  ]
})
export class CoreModule {
}

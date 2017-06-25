import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {AlertService} from "./services/alert/alert.service";
import {Logger} from "./services/logger/logger.service";
import {ItemTypeService} from "../item/services/item-type/item-type.service";
import {UserService} from "./services/user/user.service";
import {HttpModule} from "@angular/http";
import {AlertModule} from "ngx-bootstrap";
import {BusyService} from "./services/busy/busy.service";
import {BusyOverlayComponent} from "./services/busy/busy-overlay.component";
import {AppInfoService} from "./services/app-info/app-info.service";

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
    ItemTypeService,
    BusyService,
    Logger,
    UserService
  ]
})
export class CoreModule {
}

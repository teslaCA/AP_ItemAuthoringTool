import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {Ng2BootstrapModule} from "ngx-bootstrap";

import {AlertService} from "./alert.service/alert.service";
import {Logger} from "./logger.service/logger.service";
import {ItemTypeService} from "../item/services/item-type.service/item-type.service";
import {UserService} from "./user.service/user.service";
import {HttpModule} from "@angular/http";
import {AlertModule} from "ngx-bootstrap";
import {BusyService} from "./busy.service/busy.service";
import {BusyOverlayComponent} from "./busy.service/busy-overlay.component";
import {AppInfoService} from "./app-info.service/app-info.service";
import {HttpUtility} from "./http-utility.service/http-utility";
import {IdleService} from "./idle.service/idle.service";
import {IdleModalComponent} from './idle.service/idle-modal.component';

@NgModule({
  declarations: [
    BusyOverlayComponent,
    IdleModalComponent
  ],
  exports: [
    BusyOverlayComponent,
    IdleModalComponent
  ],
  imports: [
    AlertModule,
    CommonModule,
    HttpModule,
    Ng2BootstrapModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  providers: [
    AlertService,
    AppInfoService,
    ItemTypeService,
    BusyService,
    Logger,
    UserService,
    HttpUtility,
    IdleService
  ]
})
export class CoreModule {
}

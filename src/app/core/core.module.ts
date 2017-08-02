import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';

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
import {SessionTimeoutComponent} from './session-timeout.service/session-timeout.component';

@NgModule({
  declarations: [
    BusyOverlayComponent,
    SessionTimeoutComponent
  ],
  exports: [
    BusyOverlayComponent,
    SessionTimeoutComponent
  ],
  imports: [
    AlertModule,
    CommonModule,
    HttpModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  providers: [
    AlertService,
    AppInfoService,
    ItemTypeService,
    BusyService,
    Logger,
    UserService,
    HttpUtility
  ]
})
export class CoreModule {
}

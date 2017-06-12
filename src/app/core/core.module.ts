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

@NgModule({
  imports: [
    AlertModule,
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers: [
    AlertService,
    BuildInfoService,
    ItemService,
    ItemTypeService,
    Logger,
    UserService
  ]
})
export class CoreModule {
}

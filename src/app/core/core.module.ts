import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {AlertService} from "./alert.service";
import {Logger} from "./logger.service";
import {BuildInfoService} from "./build-info.service";
import {ItemService} from "./item.service";
import {ItemTypeService} from "./item-type.service";
import {UserService} from "./user.service";

@NgModule({
  imports: [
    CommonModule
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

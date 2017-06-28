import {async, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";
import {CreateItemSelectTypeComponent} from "./create-item-select-type.component";
import {AppInfoService} from "../../../../core/services/app-info/app-info.service";
import {RouterTestingModule} from "@angular/router/testing";
import {Logger} from "../../../../core/services/logger/logger.service";
import {ItemTypeService} from "../../../services/item-type/item-type.service";
import {AlertService} from "../../../../core/services/alert/alert.service";
import {ToastyConfig, ToastyService} from "ng2-toasty";
import {CoreModule} from "../../../../core/core.module";
import {ItemService} from "../../../services/item/item.service";

describe('CreateItemSelectTypeComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateItemSelectTypeComponent
      ],
      imports: [
        CoreModule,
        HttpModule,
        RouterTestingModule
      ],
      providers: [
        AlertService,
        AppInfoService,
        ItemService,
        ItemTypeService,
        Logger,
        ToastyService,
        ToastyConfig
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const fixture = TestBed.createComponent(CreateItemSelectTypeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

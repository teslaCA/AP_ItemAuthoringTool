import {async, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";
import {ItemCreateComponent} from "./item-create.component";
import {AppInfoService} from "../../../core/app-info.service/app-info.service";
import {RouterTestingModule} from "@angular/router/testing";
import {Logger} from "../../../core/logger.service/logger.service";
import {ItemTypeService} from "../../services/item-type.service/item-type.service";
import {AlertService} from "../../../core/alert.service/alert.service";
import {ToastyConfig, ToastyService} from "ng2-toasty";
import {CoreModule} from "../../../core/core.module";
import {ItemService} from "../../services/item.service/item.service";

describe('ItemCreateComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemCreateComponent
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
    const fixture = TestBed.createComponent(ItemCreateComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

import {async, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";
import {AppHeaderComponent} from "./app-header.component";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ModalModule} from "ngx-bootstrap/modal";
import {CollapseDirective} from "ngx-bootstrap/collapse";
import {Logger} from "../core/logger.service/logger.service";
import {UserService} from "../core/user.service/user.service";
import {AlertService} from "../core/alert.service/alert.service";
import {ToastyConfig, ToastyService} from "ng2-toasty";
import {HttpUtility} from "../core/http-utility.service/http-utility";
import {BusyService} from "../core/busy.service/busy.service";

describe('AppHeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppHeaderComponent,
        CollapseDirective
      ],
      imports: [
        HttpModule,
        BsDropdownModule.forRoot(),
        ModalModule.forRoot()
      ],
      providers: [
        Logger,
        UserService,
        HttpUtility,
        AlertService,
        ToastyService,
        ToastyConfig,
        BusyService
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const fixture = TestBed.createComponent(AppHeaderComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

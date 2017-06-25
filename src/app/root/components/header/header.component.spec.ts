import {async, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";
import {HeaderComponent} from "./header.component";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ModalModule} from "ngx-bootstrap/modal";
import {CollapseDirective} from "ngx-bootstrap/collapse";
import {Logger} from "../../../core/services/logger/logger.service";
import {UserService} from "../../../core/services/user/user.service";
import {AlertService} from "../../../core/services/alert/alert.service";
import {ToastyConfig, ToastyService} from "ng2-toasty";
import {HttpUtility} from "../../../core/services/http-utility/http-utility";
import {BusyService} from "../../../core/services/busy/busy.service";

describe('HeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
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
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

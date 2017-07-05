import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {APP_BASE_HREF} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ModalModule} from "ngx-bootstrap/modal";
import {AlertModule} from "ngx-bootstrap/alert";

import {AppComponent} from "./app.component";
import {ToastyModule} from "ng2-toasty";
import {AppFooterComponent} from "./app-footer.component/app-footer.component";
import {ItemDashboardComponent} from "./item/dashboard/item-dashboard.component";
import {CreateItemComponent} from "./item/dashboard/create-item.component/create-item.component";
import {SaItemDetailsComponent} from "./item/crud/details/sa-item-details.component/sa-item-details.component";
import {WerItemDetailsComponent} from "./item/crud/details/wer-item-details.component/wer-item-details.component";
import {FindItemComponent} from "./item/dashboard/find-item.component/find-item.component";
import {AppInfoService} from "./core/app-info.service/app-info.service";
import {Logger} from "./core/logger.service/logger.service";
import {UserService} from "./core/user.service/user.service";
import {CoreModule} from "./core/core.module";
import {AppHeaderComponent} from "./app-header.component/app-header.component";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AppHeaderComponent,
        AppFooterComponent,
        ItemDashboardComponent,
        CreateItemComponent,
        SaItemDetailsComponent,
        WerItemDetailsComponent,
        FindItemComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        AppInfoService,
        Logger,
        UserService
      ],
      imports: [
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule.forRoot([]),
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        AlertModule.forRoot(),
        ToastyModule.forRoot()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

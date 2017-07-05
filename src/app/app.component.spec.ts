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
import {ItemCreateComponent} from "./item/dashboard/item-create.component/item-create.component";
import {ItemSaDetailsComponent} from "./item/crud/details/item-sa-details.component/item-sa-details.component";
import {ItemWerDetailsComponent} from "./item/crud/details/item-wer-details.component/item-wer-details.component";
import {ItemSearchComponent} from "./item/dashboard/item-search.component/item-search.component";
import {AppInfoService} from "./core/app-info.service/app-info.service";
import {Logger} from "./core/logger.service/logger.service";
import {UserService} from "./core/user.service/user.service";
import {CoreModule} from "./core/core.module";
import {AppHeaderComponent} from "./app-header.component/app-header.component";
import {ItemStimDetailsComponent} from "./item/crud/details/item-stim-details.component/item-stim-details.component";

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
        ItemCreateComponent,
        ItemSaDetailsComponent,
        ItemStimDetailsComponent,
        ItemWerDetailsComponent,
        ItemSearchComponent
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

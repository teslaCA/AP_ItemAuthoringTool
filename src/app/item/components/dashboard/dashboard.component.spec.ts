import {async, TestBed} from "@angular/core/testing";
import {APP_BASE_HREF} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ModalModule} from "ngx-bootstrap/modal";
import {AlertModule} from "ngx-bootstrap/alert";
import {Ng2BootstrapModule} from "ngx-bootstrap/ng2-bootstrap";

import {DashboardComponent} from "./dashboard.component";
import {AppRoutingModule} from "../../../app.routing";
import {AppComponent} from "../../../app.component";
import {HeaderComponent} from "../../../header.component";
import {FooterComponent} from "../../../footer.component";
import {ItemSelectTypeComponent} from "../item-create/item-select-type/item-select-type.component";
import {ItemCreateComponent} from "../item-create/item-create.component";
import {ItemLoadSaComponent} from "../item-load-sa/item-load-sa.component";
import {ItemLoadComponent} from "../item-load/item-load.component";
import {ItemRedirectComponent} from "../item-redirect/item-redirect.component";
import {ResourceNotFoundComponent} from "../../../resource-not-found.component";
import {Logger} from "../../../core/logger.service";
import {ToastyModule} from "ng2-toasty";
import {AlertService} from "../../../core/alert.service";
import {ItemSearchComponent} from "../item-search/item-search.component";

describe('DashboardComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        DashboardComponent,
        ItemSelectTypeComponent,
        ItemCreateComponent,
        ItemLoadSaComponent,
        ItemLoadComponent,
        ItemRedirectComponent,
        ResourceNotFoundComponent,
        ItemSearchComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        AlertModule.forRoot(),
        Ng2BootstrapModule.forRoot(),
        ToastyModule.forRoot()
      ],
      providers: [
        Logger,
        AlertService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

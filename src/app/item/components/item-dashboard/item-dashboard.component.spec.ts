import {async, TestBed} from "@angular/core/testing";
import {APP_BASE_HREF} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ModalModule} from "ngx-bootstrap/modal";
import {AlertModule} from "ngx-bootstrap/alert";
import {Ng2BootstrapModule} from "ngx-bootstrap/ng2-bootstrap";

import {ItemDashboardComponent} from "./item-dashboard.component";
import {AppRoutingModule} from "../../../app.routing";
import {AppComponent} from "../../../app.component";
import {HeaderComponent} from "../../../header.component";
import {FooterComponent} from "../../../footer.component";
import {CreateItemSelectTypeComponent} from "../create-item-select-type/create-item-select-type.component";
import {CreateItemComponent} from "../create-item/create-item.component";
import {LoadSaItemComponent} from "../load-sa-item/load-sa-item.component";
import {LoadItemComponent} from "../load-item/load-item.component";
import {LoadItemRedirectComponent} from "../load-item-redirect/load-item-redirect.component";
import {ResourceNotFoundComponent} from "../../../resource-not-found.component";
import {Logger} from "../../../core/logger.service";
import {ToastyModule} from "ng2-toasty";
import {AlertService} from "../../../core/alert.service";
import {FindItemComponent} from "../find-item/find-item.component";

describe('ItemDashboardComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        ItemDashboardComponent,
        CreateItemSelectTypeComponent,
        CreateItemComponent,
        LoadSaItemComponent,
        LoadItemComponent,
        LoadItemRedirectComponent,
        ResourceNotFoundComponent,
        FindItemComponent
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
    const fixture = TestBed.createComponent(ItemDashboardComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

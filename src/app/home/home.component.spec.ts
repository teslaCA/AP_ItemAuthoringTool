import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';


import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ModalModule} from "ngx-bootstrap/modal";
import {AlertModule} from "ngx-bootstrap/alert";
import {Ng2BootstrapModule} from "ngx-bootstrap/ng2-bootstrap";

import {HomeComponent} from "./home.component";

import {AppRoutingModule} from "../app.routing";
import {AppComponent} from "../app.component";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {ItemSelectTypeComponent} from "../item/item-create/item-select-type/item-select-type.component";
import {ItemCreateComponent} from "../item/item-create/item-create.component";
import {ItemLoadSaComponent} from "../item/item-load-sa/item-load-sa.component";
import {ItemLoadComponent} from "../item/item-load/item-load.component";
import {ItemRedirectComponent} from "../item/item-redirect/item-redirect.component";
import {NoRouteComponent} from "../no-route/no-route.component";
import {Logger} from "../utility/logger";
import {ToastyModule} from "ng2-toasty";
import {AlertService} from "../service/alert.service";

describe('HomeComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        HomeComponent,
        ItemSelectTypeComponent,
        ItemCreateComponent,
        ItemLoadSaComponent,
        ItemLoadComponent,
        ItemRedirectComponent,
        NoRouteComponent
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
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

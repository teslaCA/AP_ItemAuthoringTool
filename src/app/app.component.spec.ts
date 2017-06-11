import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {APP_BASE_HREF} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ModalModule} from "ngx-bootstrap/modal";
import {AlertModule} from "ngx-bootstrap/alert";

import {AppComponent} from "./app.component";
import {HeaderComponent} from "./shared/header/header.component";
import {FooterComponent} from "./shared/footer/footer.component";
import {ItemSelectTypeComponent} from "./item/item-create/item-select-type/item-select-type.component";
import {HomeComponent} from "./home/home.component";
import {ItemCreateComponent} from "./item/item-create/item-create.component";
import {ItemLoadSaComponent} from "./item/item-load-sa/item-load-sa.component";
import {ToastyModule} from "ng2-toasty";
import {ItemSearchComponent} from "./item/item-search/item-search.component";
import {Logger} from "./core/logger.service";
import {UserService} from "./core/user.service";
import {BuildInfoService} from "./core/build-info.service";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        ItemSelectTypeComponent,
        ItemCreateComponent,
        ItemLoadSaComponent,
        ItemSearchComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        BuildInfoService,
        Logger,
        UserService
      ],
      imports: [
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

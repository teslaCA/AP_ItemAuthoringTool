import {async, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertService} from "../../../core/alert.service/alert.service";
import {Logger} from "../../../core/logger.service/logger.service";
import {ItemSearchComponent} from "./item-search.component";
import {ToastyConfig, ToastyService} from "ng2-toasty";
import {CoreModule} from "../../../core/core.module";

describe('ItemSearchComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        ItemSearchComponent
      ],
      providers: [
        Logger,
        AlertService,
        ToastyService,
        ToastyConfig
      ],
    })
      .compileComponents();
  }));

  it('should be created', () => {
    const fixture = TestBed.createComponent(ItemSearchComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

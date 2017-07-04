import {async, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertService} from "../../../core/alert.service/alert.service";
import {Logger} from "../../../core/logger.service/logger.service";
import {FindItemComponent} from "./find-item.component";
import {ToastyConfig, ToastyService} from "ng2-toasty";
import {CoreModule} from "../../../core/core.module";

describe('FindItemComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        FindItemComponent
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
    const fixture = TestBed.createComponent(FindItemComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AlertService} from "../../../core/alert.service";
import {Logger} from "../../../core/logger.service";
import {FindItemComponent} from "./find-item.component";
import {ToastyConfig, ToastyService} from "ng2-toasty";

describe('FindItemComponent', () => {
  let component: FindItemComponent;
  let fixture: ComponentFixture<FindItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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

  beforeEach(() => {
    fixture = TestBed.createComponent(FindItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

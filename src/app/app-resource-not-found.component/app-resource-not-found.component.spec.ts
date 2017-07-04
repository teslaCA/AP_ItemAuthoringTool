import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {AppResourceNotFoundComponent} from "./app-resource-not-found.component";
import {AppModule} from "../app.module";
import {APP_BASE_HREF} from "@angular/common";

describe('AppResourceNotFoundComponent', () => {
  let component: AppResourceNotFoundComponent;
  let fixture: ComponentFixture<AppResourceNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      declarations: [],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppResourceNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

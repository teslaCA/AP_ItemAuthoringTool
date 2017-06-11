import {async, TestBed} from "@angular/core/testing";

import {FooterComponent} from "./footer.component";
import {HttpModule} from "@angular/http";
import {BuildInfoService} from "../core/build-info.service";

describe('FooterComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FooterComponent
      ],
      imports: [
        HttpModule
      ],
      providers: [
        BuildInfoService
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

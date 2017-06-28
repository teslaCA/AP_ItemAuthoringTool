import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceNotFoundComponent } from './resource-not-found.component';
import {AppModule} from "../../app.module";
import {APP_BASE_HREF} from "@angular/common";

describe('ResourceNotFoundComponent', () => {
  let component: ResourceNotFoundComponent;
  let fixture: ComponentFixture<ResourceNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      declarations: [
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

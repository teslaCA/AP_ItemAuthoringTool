import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { ReactiveFormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoadSaItemComponent } from './load-sa-item.component';
import {Logger} from "../../../core/logger.service";

describe('LoadSaItemComponent', () => {
  let component: LoadSaItemComponent;
  let fixture: ComponentFixture<LoadSaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        ModalModule.forRoot()
      ],
      declarations: [
        LoadSaItemComponent
      ],
      providers: [
        Logger
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadSaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

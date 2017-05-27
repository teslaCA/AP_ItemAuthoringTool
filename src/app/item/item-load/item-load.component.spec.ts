import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule} from '@angular/forms';
import { RouterTestingModule} from '@angular/router/testing';

import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ItemLoadSaComponent} from '../item-load-sa/item-load-sa.component';
import { ItemLoadComponent } from './item-load.component';

describe('ItemLoadComponent', () => {
  let component: ItemLoadComponent;
  let fixture: ComponentFixture<ItemLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        AlertModule.forRoot()
      ],
      declarations: [
        ItemLoadComponent,
        ItemLoadSaComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

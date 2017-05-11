import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule} from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmService, ConfirmState, ConfirmModalComponent } from '../../confirm-modal/confirm-modal';
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
        NgbModule.forRoot()
      ],
      declarations: [
        ItemLoadComponent,
        ItemLoadSaComponent,
        ConfirmModalComponent
      ],
      providers: [
        ConfirmService,
        ConfirmState
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

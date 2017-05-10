import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { ItemLoadSaComponent } from './item-load-sa.component';
import { ConfirmService, ConfirmState, ConfirmModalComponent } from '../../confirm-modal/confirm-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ItemCreateSaComponent', () => {
  let component: ItemLoadSaComponent;
  let fixture: ComponentFixture<ItemLoadSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgbModule.forRoot()
      ],
      declarations: [
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
    fixture = TestBed.createComponent(ItemLoadSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

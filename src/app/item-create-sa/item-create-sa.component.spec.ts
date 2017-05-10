import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { ItemCreateSaComponent } from './item-create-sa.component';
import { ConfirmService, ConfirmState, ConfirmModalComponent } from '.././confirm-modal/confirm-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ItemCreateSaComponent', () => {
  let component: ItemCreateSaComponent;
  let fixture: ComponentFixture<ItemCreateSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgbModule.forRoot()
      ],
      declarations: [
        ItemCreateSaComponent,
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
    fixture = TestBed.createComponent(ItemCreateSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

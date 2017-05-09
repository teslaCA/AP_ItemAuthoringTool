import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule} from '@angular/router/testing';
import { LookupService } from '../service/lookup.service';
import { ItemService } from '../service/item.service';
import { ItemCreateComponent } from './item-create.component';
import { ItemCreateSaComponent} from '../item-create-sa/item-create-sa.component';
import { ConfirmService, ConfirmState, ConfirmModalComponent } from '.././confirm-modal/confirm-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


describe('ItemCreateComponent', () => {
  let component: ItemCreateComponent;
  let fixture: ComponentFixture<ItemCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule,
        NgbModule.forRoot()
      ],
      declarations: [
        ItemCreateComponent,
        ItemCreateSaComponent,
        ConfirmModalComponent
      ],
      providers: [
        LookupService,
        ItemService,
        ConfirmService,
        ConfirmState
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

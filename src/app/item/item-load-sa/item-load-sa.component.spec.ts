import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ItemLoadSaComponent } from './item-load-sa.component';

describe('ItemCreateSaComponent', () => {
  let component: ItemLoadSaComponent;
  let fixture: ComponentFixture<ItemLoadSaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ModalModule.forRoot()
      ],
      declarations: [
        ItemLoadSaComponent
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ItemSelectTypeComponent } from './item-select-type.component';
import { LookupService} from '../../../service/lookup.service';
import { RouterTestingModule} from '@angular/router/testing';
import { ConfirmService, ConfirmState } from '../../../confirm-modal/confirm-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ItemSelectTypeComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemSelectTypeComponent
      ],
      imports: [
        HttpModule,
        RouterTestingModule,
        NgbModule.forRoot()
      ],
      providers: [
        LookupService,
        ConfirmService,
        ConfirmState
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(ItemSelectTypeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

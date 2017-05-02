import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ItemSelectComponent } from './item-select.component';
import { LookupService} from '../service/lookup.service';
import { RouterTestingModule} from '@angular/router/testing';

describe('ItemSelectComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemSelectComponent
      ],
      imports: [
        HttpModule,
        RouterTestingModule
      ],
      providers: [
        LookupService
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(ItemSelectComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

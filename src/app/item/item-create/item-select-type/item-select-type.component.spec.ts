import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ItemSelectTypeComponent } from './item-select-type.component';
import { BuildInfoService} from '../../../core/build-info.service';
import { RouterTestingModule} from '@angular/router/testing';
import {Logger} from "../../../core/logger.service";
import {ItemTypeService} from "../../../core/item-type.service";

describe('ItemSelectTypeComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemSelectTypeComponent
      ],
      imports: [
        HttpModule,
        RouterTestingModule
      ],
      providers: [
        BuildInfoService,
        ItemTypeService,
        Logger
      ]
    }).compileComponents();
  }));

  it('should be created', () => {
    const fixture = TestBed.createComponent(ItemSelectTypeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

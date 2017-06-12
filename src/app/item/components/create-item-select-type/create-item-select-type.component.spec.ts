import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { CreateItemSelectTypeComponent } from './create-item-select-type.component';
import { BuildInfoService} from '../../../core/build-info.service';
import { RouterTestingModule} from '@angular/router/testing';
import {Logger} from "../../../core/logger.service";
import {ItemTypeService} from "../../services/item-type.service";

describe('CreateItemSelectTypeComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateItemSelectTypeComponent
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
    const fixture = TestBed.createComponent(CreateItemSelectTypeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemAutoSaveComponent} from "./item-auto-save.component";
import {ToastyConfig, ToastyService} from "ng2-toasty";
import {CoreModule} from "../../../core/core.module";
import {ItemService} from "../../services/item.service/item.service";
import {Logger} from "../../../core/logger.service/logger.service";

describe('ItemAutoSaveComponent', () => {
  let component: ItemAutoSaveComponent;
  let fixture: ComponentFixture<ItemAutoSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ItemAutoSaveComponent
      ],
      imports: [
        CoreModule
      ],
      providers: [
        ItemService,
        Logger,
        ToastyService,
        ToastyConfig
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAutoSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

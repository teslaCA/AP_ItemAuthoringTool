import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {ItemAutoSaveComponent} from "./item-auto-save.component";
import {Logger} from "../../../core/services/logger/logger.service";
import {ItemService} from "../../services/item/item.service";
import {CoreModule} from "../../../core/core.module";
import {ToastyConfig, ToastyService} from "ng2-toasty";

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

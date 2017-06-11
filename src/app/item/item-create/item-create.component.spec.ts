import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';
import {AlertModule} from 'ngx-bootstrap/alert';
import {BuildInfoService} from '../../core/build-info.service';
import {ItemService} from '../../core/item.service';
import {ItemCreateComponent} from './item-create.component';
import {Logger} from "../../core/logger.service";
import {AlertService} from "../../core/alert.service";
import {ToastyModule} from "ng2-toasty";

describe('ItemCreateComponent', () => {
    let component: ItemCreateComponent;
    let fixture: ComponentFixture<ItemCreateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
              HttpModule,
              RouterTestingModule,
              AlertModule.forRoot(),
              ToastyModule
            ],
            declarations: [
              ItemCreateComponent
            ],
            providers: [
              BuildInfoService,
              ItemService,
              Logger,
              AlertService
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

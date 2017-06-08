import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';
import {AlertModule} from 'ngx-bootstrap/alert';
import {LookupService} from '../../service/lookup.service';
import {ItemService} from '../../service/item.service';
import {ItemCreateComponent} from './item-create.component';
import {Logger} from "../../service/logger.service";
import {AlertService} from "../../service/alert.service";
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
              LookupService,
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

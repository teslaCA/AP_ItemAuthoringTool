import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';
import {AlertModule} from 'ngx-bootstrap/alert';
import {BuildInfoService} from '../../../core/build-info.service';
import {ItemService} from '../../services/item.service';
import {CreateItemComponent} from './create-item.component';
import {Logger} from "../../../core/logger.service";
import {AlertService} from "../../../core/alert.service";
import {ToastyModule} from "ng2-toasty";

describe('CreateItemComponent', () => {
    let component: CreateItemComponent;
    let fixture: ComponentFixture<CreateItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
              HttpModule,
              RouterTestingModule,
              AlertModule.forRoot(),
              ToastyModule
            ],
            declarations: [
              CreateItemComponent
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
        fixture = TestBed.createComponent(CreateItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

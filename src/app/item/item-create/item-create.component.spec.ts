import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpModule} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';
import {AlertModule} from 'ngx-bootstrap/alert';
import {LookupService} from '../../service/lookup.service';
import {ItemService} from '../../service/item.service';
import {ItemCreateComponent} from './item-create.component';
import {Logger} from "../../utility/logger";

describe('ItemCreateComponent', () => {
    let component: ItemCreateComponent;
    let fixture: ComponentFixture<ItemCreateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                RouterTestingModule,
                AlertModule.forRoot()
            ],
            declarations: [
                ItemCreateComponent
            ],
            providers: [
                LookupService,
                ItemService,
                Logger
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

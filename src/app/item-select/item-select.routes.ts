/**
 * Created by alexponce on 4/26/17.
 */
import {Route} from '@angular/router';
import {ItemSelectComponent} from "./item-select.component";


export const MODULE_ROUTES: Route[] = [
  {path: 'item-select', pathMatch: 'full', component: ItemSelectComponent}
];

export const MODULE_COMPONENTS = [
  ItemSelectComponent
];

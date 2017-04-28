/**
 * Created by alexponce on 4/26/17.
 */
import {Route} from '@angular/router';
import {HomeBarComponent} from './home-bar.component';


export const MODULE_ROUTES: Route[] = [
  {path: '', pathMatch: 'full', component: HomeBarComponent}
];

export const MODULE_COMPONENTS = [
  HomeBarComponent
];

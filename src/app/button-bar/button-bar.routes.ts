/**
 * Created by alexponce on 4/26/17.
 */
import {Route} from '@angular/router';
import {ButtonBarComponent} from "./button-bar.component";


export const MODULE_ROUTES: Route[] = [
  {path: 'items', pathMatch: 'full', component: ButtonBarComponent}
];

export const MODULE_COMPONENTS = [
  ButtonBarComponent
];

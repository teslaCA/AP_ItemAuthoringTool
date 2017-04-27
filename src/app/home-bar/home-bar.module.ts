/**
 * Created by alexponce on 4/26/17.
 */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {MODULE_COMPONENTS, MODULE_ROUTES} from './home-bar.routes';

@NgModule({
  imports: [BrowserModule, HttpModule, RouterModule.forChild(MODULE_ROUTES)],
  declarations: [MODULE_COMPONENTS]
})
export class ButtonBarModule {
}

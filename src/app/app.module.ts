import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {HomeModule} from './home';
import {NavbarModule} from './navbar';

import {AlertModule, ButtonsModule, TabsModule} from 'ng2-bootstrap';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HomeModule,
    NavbarModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {HeaderComponent} from './header.component';
import {LogOutComponent} from './log-out/logout.component';

@NgModule({
  imports: [RouterModule, CommonModule, NgbModule],
  declarations: [HeaderComponent, LogOutComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {
}

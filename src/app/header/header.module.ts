import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';

import { LogOutComponent } from './log-out/logout.component';

@NgModule({
  imports: [ RouterModule, CommonModule ],
  declarations: [ HeaderComponent, LogOutComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule {}

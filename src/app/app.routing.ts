/**
 * Created by alexponce on 4/28/17.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeBarComponent } from './home-bar/home-bar.component';
import { ItemSelectComponent } from './item-select/item-select.component';

const routes: Routes = [
  { path: '', component: HomeBarComponent},
  { path: 'item-select',  component: ItemSelectComponent }

  /*
   { path: '', redirectTo: '/home-bar', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent }
  */
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

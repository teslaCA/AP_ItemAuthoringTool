/**
 * Created by alexponce on 4/28/17.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeBarComponent } from './home-bar/home-bar.component';
import { ItemSelectComponent } from './item-select/item-select.component';
import { ItemCreateComponent } from './item-create/item-create.component';

const routes: Routes = [
  { path: '', component: HomeBarComponent},
  { path: 'item-select',  component: ItemSelectComponent },
  { path: 'item-create/:type', component: ItemCreateComponent}

  /*
   { path: '', redirectTo: '/home-bar', pathMatch: 'full' },
  */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
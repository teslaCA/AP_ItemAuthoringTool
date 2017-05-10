/**
 * Created by alexponce on 4/28/17.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemSelectTypeComponent } from './item/item-create/item-select-type/item-select-type.component';
import { ItemCreateComponent } from './item/item-create/item-create.component';
import { ItemLoadComponent } from './item/item-load/item-load.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'item/:id', component: ItemLoadComponent},
  { path: 'item/create/select-type',  component: ItemSelectTypeComponent },
  { path: 'item/create/:type', component: ItemCreateComponent}

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

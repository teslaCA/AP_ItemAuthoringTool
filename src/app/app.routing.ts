import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./item/dashboard/dashboard.component";
import {ItemSelectTypeComponent} from "./item/item-create/item-select-type/item-select-type.component";
import {ItemCreateComponent} from "./item/item-create/item-create.component";
import {ItemLoadComponent} from "./item/item-load/item-load.component";
import {ItemRedirectComponent} from "./item/item-redirect/item-redirect.component";
import {NotFoundComponent} from "./shared/not-found/not-found.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'item/:id', component: ItemLoadComponent},
  {path: 'item-redirect/:id', component: ItemRedirectComponent},
  {path: 'item/create/select-type', component: ItemSelectTypeComponent},
  {path: 'item/create/:type', component: ItemCreateComponent},
  {path: 'unavailable', component: NotFoundComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

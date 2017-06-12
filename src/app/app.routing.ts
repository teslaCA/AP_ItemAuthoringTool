import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./item/components/dashboard/dashboard.component";
import {ItemSelectTypeComponent} from "./item/components/item-create/item-select-type/item-select-type.component";
import {ItemCreateComponent} from "./item/components/item-create/item-create.component";
import {ItemLoadComponent} from "./item/components/item-load/item-load.component";
import {ItemRedirectComponent} from "./item/components/item-redirect/item-redirect.component";
import {ResourceNotFoundComponent} from "./resource-not-found.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'item/:id', component: ItemLoadComponent},
  {path: 'item-redirect/:id', component: ItemRedirectComponent},
  {path: 'item/create/select-type', component: ItemSelectTypeComponent},
  {path: 'item/create/:type', component: ItemCreateComponent},
  {path: 'unavailable', component: ResourceNotFoundComponent},
  {path: '**', component: ResourceNotFoundComponent}
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

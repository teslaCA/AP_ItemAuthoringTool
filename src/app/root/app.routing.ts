import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ItemDashboardComponent} from "../item/components/item-dashboard/item-dashboard.component";
import {CreateItemSelectTypeComponent} from "../item/components/item-dashboard/create-item-select-type/create-item-select-type.component";
import {ItemComponent} from "../item/components/item/item.component";
import {ItemRedirectComponent} from "../item/components/item/item-redirect/item-redirect.component";
import {ResourceNotFoundComponent} from "./components/resource-not-found/resource-not-found.component";

const routes: Routes = [
  {path: '', component: ItemDashboardComponent},
  {path: 'item/:id', component: ItemComponent},
  {path: 'item-redirect/:id', component: ItemRedirectComponent},
  {path: 'item/create/select-type', component: CreateItemSelectTypeComponent},
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

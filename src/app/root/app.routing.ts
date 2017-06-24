import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ItemDashboardComponent} from "../item/components/item-dashboard/item-dashboard.component";
import {CreateItemSelectTypeComponent} from "../item/components/create-item-select-type/create-item-select-type.component";
import {LoadItemComponent} from "../item/components/load-item/load-item.component";
import {LoadItemRedirectComponent} from "../item/components/load-item-redirect/load-item-redirect.component";
import {ResourceNotFoundComponent} from "./components/resource-not-found/resource-not-found.component";

const routes: Routes = [
  {path: '', component: ItemDashboardComponent},
  {path: 'item/:id', component: LoadItemComponent},
  {path: 'item-redirect/:id', component: LoadItemRedirectComponent},
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

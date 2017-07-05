import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ItemDashboardComponent} from "./item/dashboard/item-dashboard.component";
import {CreateItemComponent} from "./item/dashboard/create-item.component/create-item.component";
import {ItemCrudComponent} from "./item/crud/item-crud.component";
import {ItemRedirectComponent} from "./item/crud/item-redirect.component/item-redirect.component";
import {AppResourceNotFoundComponent} from "./app-resource-not-found.component/app-resource-not-found.component";

const routes: Routes = [
  {path: '', component: ItemDashboardComponent},
  {path: 'item/:id', component: ItemCrudComponent},
  {path: 'item-redirect/:id', component: ItemRedirectComponent},
  {path: 'item/create/select-type', component: CreateItemComponent},
  {path: 'unavailable', component: AppResourceNotFoundComponent},
  {path: '**', component: AppResourceNotFoundComponent}
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

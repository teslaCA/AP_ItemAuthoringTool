import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ItemDashboardComponent} from "./item/dashboard/item-dashboard.component";
import {ItemCreateComponent} from "./item/dashboard/item-create.component/item-create.component";
import {ItemCrudComponent} from "./item/crud/item-crud.component";
import {AppResourceNotFoundComponent} from "./app-resource-not-found.component/app-resource-not-found.component";

const routes: Routes = [
  {path: '', component: ItemDashboardComponent},
  {path: 'item/:id', component: ItemCrudComponent},
  {path: 'item/create/select-type', component: ItemCreateComponent},
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

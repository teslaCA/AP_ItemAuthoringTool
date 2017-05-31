/*
 * Copyright 2017 Regents of the University of California.
 *
 * Licensed under the Educational Community License, Version 2.0 (the "license");
 * you may not use this file except in compliance with the License. You may
 * obtain a copy of the license at
 *
 * https://opensource.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ItemSelectTypeComponent} from "./item/item-create/item-select-type/item-select-type.component";
import {ItemCreateComponent} from "./item/item-create/item-create.component";
import {ItemLoadComponent} from "./item/item-load/item-load.component";
import {ItemRedirectComponent} from "./item/item-redirect/item-redirect.component";
import {NoRouteComponent} from "./no-route/no-route.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'item/:id', component: ItemLoadComponent},
  {path: 'item-redirect/:id', component: ItemRedirectComponent},
  {path: 'item/create/select-type', component: ItemSelectTypeComponent},
  {path: 'item/create/:type', component: ItemCreateComponent},
  {path: 'unavailable', component: NoRouteComponent},
  {path: '**', component: NoRouteComponent}
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
export class AppRoutingModule {
}

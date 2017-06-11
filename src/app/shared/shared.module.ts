import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {Ng2BootstrapModule} from "ngx-bootstrap";
import {NotFoundComponent} from "./not-found/not-found.component";

@NgModule({
  imports: [
    CommonModule,
    Ng2BootstrapModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent
  ]
})
export class SharedModule {
}

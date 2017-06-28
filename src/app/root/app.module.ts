import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {Ng2BootstrapModule} from "ngx-bootstrap/ng2-bootstrap";
import {AppRoutingModule} from "./app.routing";
import {AppComponent} from "./components/app/app.component";
import {ToastyModule} from "ng2-toasty";
import {JsonConvert} from "json2typescript";

import {ResourceNotFoundComponent} from "./components/resource-not-found/resource-not-found.component";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {CoreModule} from "../core/core.module";
import {ItemModule} from "../item/item.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ResourceNotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ItemModule,
    CoreModule,
    Ng2BootstrapModule.forRoot(),
    SharedModule,
    ToastyModule.forRoot()
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor() {
    AppModule.configureJson2TypescriptLibrary();
  }

  private static configureJson2TypescriptLibrary() {
    JsonConvert.debugMode = false;              // Whether to print debug data when converting
    JsonConvert.ignorePrimitiveChecks = false;  // Whether to allow assigning number to string, etc.
    JsonConvert.valueCheckingMode = JsonConvert.ValueCheckingMode.ALLOW_NULL;
  }
}


import {Component} from "@angular/core";
import {IdleService} from "./core/idle.service/idle.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(private idleService: IdleService) {

  }
}

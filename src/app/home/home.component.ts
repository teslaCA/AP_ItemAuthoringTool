import {Component, OnInit} from '@angular/core';
import {Logger} from "../utility/logger";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})

export class HomeComponent implements OnInit {
  constructor(
    private logger: Logger
  ) {
  }

  ngOnInit() {
  }
}

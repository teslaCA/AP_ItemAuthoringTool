import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-header',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'header.component.html',
  styleUrls: [ 'header.component.scss' ]
})
export class HeaderComponent {

  public isCollapsed = true;

  constructor() {}
}

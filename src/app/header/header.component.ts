import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Http, Response} from '@angular/http';

@Component({
  selector: 'app-header',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'header.component.html',
  styleUrls: [ 'header.component.scss' ],
  providers: []
})
export class HeaderComponent {

  public isCollapsed = true;

  public user: any;

  constructor(private http: Http) {
    this.http.request('/api/users/')
      .subscribe((res: Response) => {
        this.user = res.json();
      });
  }


}

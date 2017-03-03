import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'App works!';
  singleModel = '1';

  data: Object;
  loading: boolean;

  constructor(private http: Http) {
  }

  makeRequest(): void {

    this.loading = true;

    this.http.request('/api/ims/ping')
      .subscribe((res: Response) => {
        this.data = res.text();
        this.loading = false;
      });
  }

}



import {Component} from '@angular/core';
import {Http, Response} from "@angular/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {

  data: Object;

  loading: boolean;

  constructor(private http: Http) {
  }

  makeRequest(): void {
    this.loading = true;

    this.http.request('/api/ims/ping').subscribe((res: Response) => {
      this.data = res.text()
      this.loading = false;
    });

  }
}

import {Injectable, Inject} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class UserService {

  user: any;

  constructor(private http: Http) {
    this.http.request('/api/users/')
      .subscribe((res: Response) => {
        this.user = res.json();
      });
  }

  getUser(): any {
    return this.user;
  }

}

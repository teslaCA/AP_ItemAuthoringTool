import {Component, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {UserService} from "./core/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  user: any;  // TODO: Strongly type

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    // Load current user
    this.userService.findCurrentUser()
      .subscribe(
        (res: Response) => {
          this.user = res.json();
        });
  }

  logOut(): void {
    window.location.href = '/saml/logout';
  }
}

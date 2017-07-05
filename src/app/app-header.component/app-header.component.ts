import {Component, OnInit} from "@angular/core";
import {UserService} from "../core/user.service/user.service";
import {User} from "../core/user.service/user";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.less']
})
export class AppHeaderComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    // Load current user
    this.userService
      .findCurrentUser()
      .subscribe(
        (user: User) => {
          this.currentUser = user;
        });
  }

  logOut(): void {
    window.location.href = '/saml/logout';
  }
}

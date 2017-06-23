import {Component, OnInit} from "@angular/core";
import {UserService} from "./core/user.service";
import {User} from "./core/models/user";
import {AlertService} from "./core/alert.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(private alertService: AlertService,
              private userService: UserService) {
  }

  ngOnInit() {
    // Load current user
    this.userService
      .findCurrentUser()
      .subscribe(
        (user: User) => {
          this.currentUser = user;
        },
        error => {
          this.alertService.error(
            "Error loading current user",
            `An error occurred while trying to load the current user, ${error}`);
        }
      );
  }

  logOut(): void {
    window.location.href = '/saml/logout';
  }
}

import {Component} from "@angular/core";
import {Response} from "@angular/http";
import {Logger} from "../core/logger.service";
import {UserService} from "../core/user.service";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  public user: any;  // TODO: Strongly type

  constructor(private logger: Logger,
              private userService: UserService) {
    this.userService.findCurrentUser()
      .subscribe((res: Response) => {
        this.user = res.json();
      });
  }

  logOut(): void {
    this.logger.debug('logging out...');
    window.location.href = '/saml/logout';
  }
}

import {Component, OnInit} from "@angular/core";
import {AppInfoService} from "./core/app-info.service/app-info.service";
import {AppInfo} from "./core/app-info.service/app-info";
import {AlertService} from "./core/alert.service/alert.service";
import {Logger} from "./core/logger.service/logger.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  appInfo: AppInfo;

  constructor(private appInfoService: AppInfoService,
              private alertService: AlertService,
              private logger: Logger) {
  }

  ngOnInit() {
    // Load build info
    this.appInfoService.findAppInfo()
      .subscribe(
        (appInfo: AppInfo) => {
          this.appInfo = appInfo;
        },
        error => {
          this.logger.error(`An error occurred while trying to load the app info, ${error}`);
          this.alertService.error(
            "Error loading app info",
            `An error occurred while trying to load the app info, ${error}`);
        });
  }
}

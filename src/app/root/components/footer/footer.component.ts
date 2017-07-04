import {Component, OnInit} from "@angular/core";
import {AppInfoService} from "../../../core/app-info.service/app-info.service";
import {AppInfo} from "../../../core/app-info.service/app-info";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  appInfo: AppInfo;

  constructor(private appInfoService: AppInfoService) {
  }

  ngOnInit() {
    // Load app info
    this.appInfoService.findAppInfo()
      .subscribe(
        (appInfo: AppInfo) => {
          this.appInfo = appInfo;
        });
  }
}

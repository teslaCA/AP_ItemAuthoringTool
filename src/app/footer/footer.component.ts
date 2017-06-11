import {Component} from "@angular/core";
import {BuildInfoService} from "../core/build-info.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent {
  buildInfo: any;

  constructor(private buildInfoService: BuildInfoService) {
    this.buildInfoService.findBuildInfo()
      .subscribe((res: Response) => {
          this.buildInfo = res.json();
        },
        () => {
          this.buildInfo = '';
        });
  }
}

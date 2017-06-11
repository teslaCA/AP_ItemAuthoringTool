import {Component} from "@angular/core";
import {BuildInfoService} from "../core/build-info.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent {
  private _buildInfo: any;
  get buildInfo(): any {
    return this._buildInfo;
  }

  constructor(private buildInfoService: BuildInfoService) {
    this.buildInfoService.findBuildInfo()
      .subscribe((res: Response) => {
          this._buildInfo = res.json();
        },
        () => {
          this._buildInfo = '';
        });
  }
}

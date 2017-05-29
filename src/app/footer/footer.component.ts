import { Component, OnInit } from '@angular/core';
import { LookupService } from '../service/lookup.service';
import {Logger} from "../utility/logger";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
  providers: [LookupService]
})
export class FooterComponent implements OnInit {

  private _buildInfo: any;

  get buildInfo(): any {
    return this._buildInfo;
  }

  constructor(
    private logger: Logger,
    private lookupService: LookupService
  ) {
    this.lookupService.getBuildInfo()
      .subscribe((res: Response) => {
        this._buildInfo = res.json();
      },
      () => {
        this._buildInfo = '';
      });
  }

  ngOnInit() {
  }
}

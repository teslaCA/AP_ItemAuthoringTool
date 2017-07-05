import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Logger} from "../../core/logger.service/logger.service";

@Component({
  selector: 'item-dashboard',
  templateUrl: './item-dashboard.component.html',
  styleUrls: ['./item-dashboard.component.less']
})
export class ItemDashboardComponent implements OnInit {
  private action = '';
  private id: number;
  public itemUrl = '';
  public itemLink = '';

  get showLink(): boolean {
    return this.action === 'create' || this.action === 'commit';
  }

  constructor(private logger: Logger,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.action = params['action'];
        this.id = params['id'];
      });

    if (this.action !== '') {
      this.itemUrl = '/item/' + this.id;
      switch (this.action) {
        case 'create' : {
          this.itemLink = 'View Newly Created Item';
          break;
        }
        case 'commit' : {
          this.itemLink = 'View Last Edited Item';
          break;
        }
      }
    }
  }
}

import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Logger} from "../../core/logger.service/logger.service";

@Component({
  selector: 'item-dashboard',
  templateUrl: './item-dashboard.component.html',
  styleUrls: ['./item-dashboard.component.less']
})
export class ItemDashboardComponent implements OnInit {
  private id: number;
  public itemUrl = '';
  public itemLink = '';

  get showLink(): boolean {
    return !!this.id;
  }

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.id = params['id'];
      });

    if (!!this.id) {
      this.itemUrl = '/item/' + this.id;
      this.itemLink = 'Last Item or Resource';
    }
  }
}

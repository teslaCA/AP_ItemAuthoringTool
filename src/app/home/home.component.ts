import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Logger} from "../core/logger.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  private action = '';

  private id: number;

  public itemUrl = '';

  public itemLink = '';

  get showLink(): boolean {
    if (this.action === 'create' || this.action === 'commit') {
      return true;
    }
    return false;
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

    this.logger.debug('action: ' + this.action);
    this.logger.debug('id: ' + this.id);

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

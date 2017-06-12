import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'load-item-redirect',
  templateUrl: './load-item-redirect.component.html',
  styleUrls: ['./load-item-redirect.component.less']
})
export class LoadItemRedirectComponent implements OnInit {
  private itemId: number;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.itemId = params['id'];
      });

    this.router.navigateByUrl('/item/' + this.itemId);
  }
}

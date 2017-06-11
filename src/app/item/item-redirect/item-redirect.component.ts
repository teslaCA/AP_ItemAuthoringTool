import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-item-redirect',
  templateUrl: './item-redirect.component.html',
  styleUrls: ['./item-redirect.component.less']
})
export class ItemRedirectComponent implements OnInit {
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

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-redirect',
  templateUrl: './item-redirect.component.html',
  styleUrls: ['./item-redirect.component.scss']
})
export class ItemRedirectComponent implements OnInit {
  private _itemId: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.params
      .subscribe(params => {
        this._itemId = params['id'];
      });

    this.router.navigateByUrl('/item/' + this._itemId);
  }

}

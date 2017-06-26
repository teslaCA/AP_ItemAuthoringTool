import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

// This component exists so that when the user is viewing an item and clicks the "Edit" button this component is
// redirected to which then immediately redirects back to the edit view.  Because the view and edit views are presented
// by the component and because you can't redirect to the component you're already on, this intermediate view is used.
// TODO: Remove this component when the view item and edit item views are separated
@Component({
  selector: 'item-redirect',
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

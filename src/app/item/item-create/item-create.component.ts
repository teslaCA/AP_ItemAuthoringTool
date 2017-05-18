import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../service/item.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss'],
  providers: [
    ItemService
  ]
})

export class ItemCreateComponent implements OnInit {

  private _itemType: string;
  private _errorMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService
  ) { }

  ngOnInit() {

    this.route.params
      .subscribe(params => {
        this._itemType = params['type'];
      });

    this.itemService.createScratchPad(this._itemType)
      .subscribe(
        item => this.processSuccess(item),
        error => this.processError(error),
        () => console.log('scratchpad item created successfully')
      );
  }

  private processSuccess(item): void {
    // TODO: Add validation
    const itemId = item.id;

    this.router.navigateByUrl('/item/' + itemId);

  }

  private processError(error): void {
    this._errorMessage = error;
  }

}

import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LookupService } from '../service/lookup.service';
import { ItemService } from '../service/item.service';
import { Item } from '../service/item';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss'],
  providers: [
    LookupService,
    ItemService
  ]
})

export class ItemCreateComponent implements OnInit {

  private currentItem = new Item();
  private errorMessage : string;


  constructor(
    private route: ActivatedRoute,
    private lookupService : LookupService,
    private itemService : ItemService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.currentItem.type = params['type'];
      });

    this.itemService.createItem(this.currentItem.type)
      .subscribe(
        item => this.loadResponseItem(item),
        error => this.errorMessage = <any>error,
        () => console.log("item-create component completed")
      );
  }

  private loadResponseItem(item) : void {
    this.currentItem = item;

    this.currentItem.name =
      this.lookupService.getItemName(this.currentItem.type);

  }

}

import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LookupService } from '../service/lookup.service';
import { ItemService } from '../service/item.service';
import { Item } from '../service/item';
import { ItemResponse} from '../service/item-response';

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

  private currentItem = new ItemResponse();

  private id: number;
  private name : string;
  private type : string;

  private errorMessage : string;


  constructor(
    private route: ActivatedRoute,
    private lookupService : LookupService,
    private itemService : ItemService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe( params => {
        this.type = params['type'];
    } );

    this.name =
      this.lookupService.getItemName(this.type);

    this.currentItem.type = this.type;

    this.itemService.createItem(this.type)
                      .subscribe(
                        item => this.id = item.id,
                        error => this.errorMessage = <any>error,
                        () => console.log("completed")
                      );

    this.id = this.currentItem.id;
  }

}

import {Injectable} from "@angular/core";

import {ItemType} from "./item-type";
import {itemTypes} from "./item-types";
import {ItemTypeCategory} from "./item-type-category";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";

@Injectable()
export class ItemTypeService {
  constructor() {
  }

  findNormalItemTypes(): Observable<ItemType[]> {
    return Observable.of(
      itemTypes.filter(itemType => itemType.category === ItemTypeCategory.Normal)
    );
  }

  findOtherItemTypes(): Observable<ItemType[]> {
    return Observable.of(
      itemTypes.filter(itemType => itemType.category === ItemTypeCategory.Other)
    );
  }

  findItemType(type: string): Observable<ItemType> {
    return Observable.of(
      itemTypes.find(itemType => itemType.type === type)
    );
  }
}

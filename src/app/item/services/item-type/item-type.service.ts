import {Injectable} from "@angular/core";

import {ItemType} from "./item-type";
import {itemTypes} from "./item-types";
import {ItemTypeCategory} from "./item-type-category";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {Logger} from "../../../core/services/logger/logger.service";

@Injectable()
export class ItemTypeService {
  constructor(private logger: Logger) {
  }

  findNormalItemTypes(): Observable<ItemType[]> {
    this.logger.debug('Finding normal item types');

    return Observable.of(
      itemTypes.filter(itemType => itemType.category === ItemTypeCategory.Normal)
    );
  }

  findItemType(type: string): Observable<ItemType> {
    this.logger.debug(`Finding item type "${type}"`);

    return Observable.of(
      itemTypes.find(itemType => itemType.type === type)
    );
  }
}

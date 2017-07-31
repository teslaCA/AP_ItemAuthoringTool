import {JsonConvert} from "json2typescript";

import {SaItem} from "./sa-item";
import {WerItem} from "./wer-item";
import {Item} from "./item";
import {StimItem} from "./stim-item";
import {itemTypes} from "../item-type.service/item-types";
import {McItem} from "./mc-item";
import {MsItem} from "./ms-item";
import {TutItem} from "./tut-item";
import {EbsrItem} from "./ebsr-item";

export class ItemFactory {
  /**
   * Return new Item instance with the concrete type determined by the JSON object's "type" field.
   *
   * Important: json2typescript fails if this static method is placed on the Item abstract base class
   * which is why this method was moved to a dedicated ItemFactory class.
   *
   * @param jsonObject from which the new item will be created
   * @returns the new Item
   */
  static fromJson(jsonObject: {type: string}): Item {
    let item: Item;

    // Initialize item from JSON
    switch (jsonObject.type) {
      case 'EBSR':
        item = JsonConvert.deserializeObject(jsonObject, EbsrItem);
        break;

      case 'mc':
        item = JsonConvert.deserializeObject(jsonObject, McItem);
        break;

      case 'ms':
        item = JsonConvert.deserializeObject(jsonObject, MsItem);
        break;

      case 'sa':
        item = JsonConvert.deserializeObject(jsonObject, SaItem);
        break;

      case 'stim':
        item = JsonConvert.deserializeObject(jsonObject, StimItem);
        break;

      case 'wer':
        item = JsonConvert.deserializeObject(jsonObject, WerItem);
        break;

      case 'tut':
        item = JsonConvert.deserializeObject(jsonObject, TutItem);
        break;

      default:
        throw new Error(`Cannot map unsupported item type "${jsonObject.type}" from JSON "${jsonObject}"`);
    }

    // Inject item type
    item.itemType = itemTypes.find(type => type.code === item.type);

    return item;
  }
}

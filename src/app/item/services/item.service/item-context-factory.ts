import {JsonConvert} from "json2typescript";

import {SaItemContext} from "./models/type/sa-item";
import {itemTypes} from "../item-type.service/item-types";
import {ItemContext} from "./models/base/item-context";

export class ItemContextFactory {
  /**
   * Return new ItemResponse instance with the concrete type determined by the JSON object's "type" field.
   *
   * Important: json2typescript fails if this static method is placed on the Item abstract base class
   * which is why this method was moved to a dedicated ItemFactory class.
   *
   * @param jsonObject from which the new item will be created
   * @returns the new Item
   */
  static fromJson(jsonObject: { item: { type: string } }): ItemContext {
    let itemResponse: ItemContext;

    // Initialize item from JSON
    switch (jsonObject.item.type.toLowerCase()) {
      // case 'ebsr':
      //   item = JsonConvert.deserializeObject(jsonObject, EbsrItem);
      //   break;
      //
      // case 'mc':
      //   item = JsonConvert.deserializeObject(jsonObject, McItem);
      //   break;
      //
      // case 'ms':
      //   item = JsonConvert.deserializeObject(jsonObject, MsItem);
      //   break;

      case 'sa':
        itemResponse = JsonConvert.deserializeObject(jsonObject, SaItemContext);
        break;

      // case 'stim':
      //   item = JsonConvert.deserializeObject(jsonObject, StimItem);
      //   break;
      //
      // case 'ti':
      //   item = JsonConvert.deserializeObject(jsonObject, TiItem);
      //   break;
      //
      // case 'wer':
      //   item = JsonConvert.deserializeObject(jsonObject, WerItem);
      //   break;
      //
      // case 'tut':
      //   item = JsonConvert.deserializeObject(jsonObject, TutItem);
      //   break;

      default:
        throw new Error(`Cannot map unsupported item type "${jsonObject.item.type}" from JSON "${jsonObject}"`);
    }

    // Inject item type
    itemResponse.item.itemType = itemTypes.find(type => type.code === itemResponse.item.type);

    return itemResponse;
  }
}

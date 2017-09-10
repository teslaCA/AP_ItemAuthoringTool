import {JsonConvert} from "json2typescript";

import {SaItem, SaItemContext, SaItemCore} from "./models/type/sa-item";
import {itemTypes} from "../item-type.service/item-types";
import {ItemContext} from "./models/base/item-context";
import {WerItem, WerItemContext, WerItemCore} from "./models/type/wer-item";
import {TutItem, TutItemContext, TutItemCore} from "./models/type/tut-item";
import {StimItem, StimItemContext, StimItemCore} from "./models/type/stim-item";
import {McItem, McItemContext, McItemCore} from "./models/type/mc-item";
import {MsItem, MsItemContext, MsItemCore} from "./models/type/ms-item";

export class ItemContextFactory {
  /**
   * Return new ItemResponse instance with the concrete type determined by the JSON object's "type" field.
   *
   * Important: json2typescript fails if this static method is placed on the Item abstract base class
   * which is why this method was moved to a dedicated ItemFactory class.
   *
   * Important: json2typescript doesn't generate strongly-typed nested objects.  This is why the ItemContext,
   * Item, and ItemCore objects are explicitly mapped rather than just mapping the ItemContext.
   *
   * @param jsonObject from which the new item will be created
   * @returns the new Item
   */
  static fromJson(jsonObject: { item: { type: string } }): ItemContext {
    let itemContext: ItemContext;

    // Initialize item from JSON
    switch (jsonObject.item.type.toLowerCase()) {
      // case 'ebsr':
      //   item = JsonConvert.deserializeObject(jsonObject, EbsrItem);
      //   break;

      case 'mc':
        itemContext = JsonConvert.deserializeObject(jsonObject, McItemContext);
        itemContext.item = JsonConvert.deserializeObject(itemContext.item, McItem);
        itemContext.item.core = JsonConvert.deserializeObject(itemContext.item.core, McItemCore);
        break;

      case 'ms':
        itemContext = JsonConvert.deserializeObject(jsonObject, MsItemContext);
        itemContext.item = JsonConvert.deserializeObject(itemContext.item, MsItem);
        itemContext.item.core = JsonConvert.deserializeObject(itemContext.item.core, MsItemCore);
        break;

      case 'sa':
        itemContext = JsonConvert.deserializeObject(jsonObject, SaItemContext);
        itemContext.item = JsonConvert.deserializeObject(itemContext.item, SaItem);
        itemContext.item.core = JsonConvert.deserializeObject(itemContext.item.core, SaItemCore);
        break;

      case 'stim':
        itemContext = JsonConvert.deserializeObject(jsonObject, StimItemContext);
        itemContext.item = JsonConvert.deserializeObject(itemContext.item, StimItem);
        itemContext.item.core = JsonConvert.deserializeObject(itemContext.item.core, StimItemCore);
        break;

      // case 'ti':
      //   item = JsonConvert.deserializeObject(jsonObject, TiItem);
      //   break;

      case 'tut':
        itemContext = JsonConvert.deserializeObject(jsonObject, TutItemContext);
        itemContext.item = JsonConvert.deserializeObject(itemContext.item, TutItem);
        itemContext.item.core = JsonConvert.deserializeObject(itemContext.item.core, TutItemCore);
        break;

      case 'wer':
        itemContext = JsonConvert.deserializeObject(jsonObject, WerItemContext);
        itemContext.item = JsonConvert.deserializeObject(itemContext.item, WerItem);
        itemContext.item.core = JsonConvert.deserializeObject(itemContext.item.core, WerItemCore);
        break;

      default:
        throw new Error(`Cannot map unsupported item type "${jsonObject.item.type}" from JSON "${jsonObject}"`);
    }

    // Inject item type
    itemContext.item.itemType = itemTypes.find(type => type.code === itemContext.item.type);

    return itemContext;
  }
}

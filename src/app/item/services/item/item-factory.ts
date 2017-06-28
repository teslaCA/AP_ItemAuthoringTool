import {JsonConvert} from "json2typescript";

import {SaItem} from "./sa-item";
import {WerItem} from "./wer-item";
import {Item} from "./item";
import {StimItem} from "./stim-item";

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
    switch (jsonObject.type) {
      case "sa":
        return JsonConvert.deserializeObject(jsonObject, SaItem);
      case "stim":
        return JsonConvert.deserializeObject(jsonObject, StimItem);
      case "wer":
        return JsonConvert.deserializeObject(jsonObject, WerItem);
      default:
        throw new Error(`Cannot map unsupported item type "${jsonObject.type}" from JSON "${jsonObject}"`);
    }
  }
}

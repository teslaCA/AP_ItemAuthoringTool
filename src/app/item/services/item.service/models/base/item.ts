import {JsonProperty} from "json2typescript";
import {ItemType} from "../../../item-type.service/item-type";
import {ItemBraille} from "../shared/item-braille";
import {AssessmentItemCore, ItemCore, OtherItemCore} from "./item-core";
import {ItemAsl} from "../shared/item-asl";

/**
 * Item model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
export abstract class Item {
  @JsonProperty("id", String)
  id: string = undefined;                           // Initialize to undefined so that field is mapped

  @JsonProperty("type", String)
  type: string = undefined;                         // Initialize to undefined so that field is mapped

  @JsonProperty("core", ItemCore)
  core: ItemCore = undefined;                       // Initialize to undefined so that field is mapped

  @JsonProperty("braille", ItemBraille)
  braille: ItemBraille = undefined;                 // Initialize to undefined so that field is mapped

  @JsonProperty("asl", ItemAsl)
  asl: ItemAsl = undefined;                 // Initialize to undefined so that field is mapped

  itemType: ItemType;
}

export abstract class AssessmentItem extends Item {
  @JsonProperty("core", AssessmentItemCore)
  core: AssessmentItemCore = undefined;             // Initialize to undefined so that field is mapped
}

export abstract class OtherItem extends Item {
  @JsonProperty("core", OtherItemCore)
  core: OtherItemCore = undefined;                  // Initialize to undefined so that field is mapped
}

import {JsonObject, JsonProperty} from "json2typescript";
import {NormalItem} from "./normal-item";
import {ItemPart} from "./item-part";
/**
 * EBSR Item model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class EbsrItem extends NormalItem {
  @JsonProperty("prompt", String)
  prompt: string = undefined;               // Initialize to undefined so that field is mapped

  @JsonProperty("partA", ItemPart)
  partA: ItemPart = undefined;      // Initialize to undefined so that field is mapped

  @JsonProperty("partB", ItemPart)
  partB: ItemPart = undefined;      // Initialize to undefined so that field is mapped
}

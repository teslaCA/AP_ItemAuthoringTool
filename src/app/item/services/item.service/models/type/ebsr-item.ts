import {JsonObject, JsonProperty} from "json2typescript";
import {ItemPart} from "../shared/item-part";
import {Item} from "../base/item";
/**
 * EBSR Item model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class EbsrItem extends Item {
  @JsonProperty("prompt", String)
  prompt: string = undefined;               // Initialize to undefined so that field is mapped

  @JsonProperty("multipleChoice", ItemPart)
  multipleChoice: ItemPart = undefined;      // Initialize to undefined so that field is mapped

  @JsonProperty("multipleSelect", ItemPart)
  multipleSelect: ItemPart = undefined;      // Initialize to undefined so that field is mapped
}

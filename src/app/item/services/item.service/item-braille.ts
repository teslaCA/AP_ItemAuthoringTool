import {JsonObject, JsonProperty} from "json2typescript";
import {ItemAttachment} from "./item-attachment";

/**
 * ItemTransaction model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class ItemBraille {
  @JsonProperty("doesThisItemRequireBraille", Boolean)
  doesThisItemRequireBraille: boolean;

  @JsonProperty("hasAllBrailleContentBeenProvided", Boolean)
  hasAllBrailleContentBeenProvided: boolean;

  // @JsonProperty("attachments", [ItemAttachment])
  // attachments: ItemAttachment[] = undefined;
}

import {JsonObject, JsonProperty} from "json2typescript";
import {ItemOption} from "../shared/item-option";
import {AssessmentItem} from "../base/item";
import {AssessmentItemCore} from "../base/item-core";
import {ItemContext} from "../base/item-context";

/**
 * MC item context that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class McItemContext extends ItemContext {
  @JsonProperty("item", McItem)
  item: McItem = undefined;                     // Initialize to undefined so that field is mapped
}

/**
 * MC item that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class McItem extends AssessmentItem {
  @JsonProperty("core", McItemCore)
  core: McItemCore = undefined;                 // Initialize to undefined so that field is mapped
}

/**
 * MC item core that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class McItemCore extends AssessmentItemCore {
  @JsonProperty("options", [ItemOption])
  options: ItemOption[] = undefined;            // Initialize to undefined so that field is mapped

  @JsonProperty("prompt", String)
  prompt: string = undefined;                   // Initialize to undefined so that field is mapped
}

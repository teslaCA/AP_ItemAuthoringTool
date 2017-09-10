import {JsonObject, JsonProperty} from "json2typescript";
import {ItemOption} from "../shared/item-option";
import {AssessmentItem} from "../base/item";
import {AssessmentItemCore} from "../base/item-core";
import {ItemContext} from "../base/item-context";

/**
 * MS item context that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class MsItemContext extends ItemContext {
  @JsonProperty("item", MsItem)
  item: MsItem = undefined;                     // Initialize to undefined so that field is mapped
}

/**
 * MS item that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class MsItem extends AssessmentItem {
  @JsonProperty("core", MsItemCore)
  core: MsItemCore = undefined;                 // Initialize to undefined so that field is mapped
}

/**
 * MS item core that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class MsItemCore extends AssessmentItemCore {
  @JsonProperty("options", [ItemOption])
  options: ItemOption[] = undefined;            // Initialize to undefined so that field is mapped

  @JsonProperty("prompt", String)
  prompt: string = undefined;                   // Initialize to undefined so that field is mapped
}

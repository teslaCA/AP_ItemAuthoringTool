import {JsonObject, JsonProperty} from "json2typescript";
import {AssessmentItem} from "../base/item";
import {ItemContext} from "../base/item-context";
import {AssessmentItemCore} from "../base/item-core";

/**
 * WER item context that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class WerItemContext extends ItemContext {
  @JsonProperty("item", WerItem)
  item: WerItem = undefined;                    // Initialize to undefined so that field is mapped
}

/**
 * SA item that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class WerItem extends AssessmentItem {
  @JsonProperty("core", WerItemCore)
  core: WerItemCore = undefined;                // Initialize to undefined so that field is mapped
}

/**
 * SA item core that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class WerItemCore extends AssessmentItemCore {
  @JsonProperty("exemplarResponses", [String])
  exemplarResponses: string[] = undefined;      // Initialize to undefined so that field is mapped

  @JsonProperty("prompt", String)
  prompt: string = undefined;                   // Initialize to undefined so that field is mapped
}

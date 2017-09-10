import {JsonObject, JsonProperty} from "json2typescript";
import {AssessmentItemCore} from "../base/item-core";
import {ItemContext} from "../base/item-context";
import {AssessmentItem} from "../base/item";

/**
 * SA item context that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class SaItemContext extends ItemContext {
  @JsonProperty("item", SaItem)
  item: SaItem = undefined;                     // Initialize to undefined so that field is mapped
}

/**
 * SA item that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class SaItem extends AssessmentItem {
  @JsonProperty("core", SaItemCore)
  core: SaItemCore = undefined;                 // Initialize to undefined so that field is mapped
}

/**
 * SA item core that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class SaItemCore extends AssessmentItemCore {
  @JsonProperty("exemplarResponses", [String])
  exemplarResponses: string[] = undefined;      // Initialize to undefined so that field is mapped

  @JsonProperty("prompt", String)
  prompt: string = undefined;                   // Initialize to undefined so that field is mapped
}

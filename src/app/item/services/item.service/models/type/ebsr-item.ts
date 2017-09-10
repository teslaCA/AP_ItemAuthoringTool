import {JsonObject, JsonProperty} from "json2typescript";
import {AssessmentItem} from "../base/item";
import {ItemContext} from "../base/item-context";
import {AssessmentItemCore} from "../base/item-core";
import {ItemOption} from "../shared/item-option";

/**
 * EBSR item context that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class EbsrItemContext extends ItemContext {
  @JsonProperty("item", EbsrItem)
  item: EbsrItem = undefined;                     // Initialize to undefined so that field is mapped
}

/**
 * EBSR item that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class EbsrItem extends AssessmentItem {
  @JsonProperty("core", EbsrItemCore)
  core: EbsrItemCore = undefined;                 // Initialize to undefined so that field is mapped
}

/**
 * EBSR item core that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class EbsrItemCore extends AssessmentItemCore {
  @JsonProperty("prompt", String)
  prompt: string = undefined;                     // Initialize to undefined so that field is mapped

  @JsonProperty("partAPrompt", String)
  partAPrompt: string = undefined;                // Initialize to undefined so that field is mapped

  @JsonProperty("partAOptions", [ItemOption])
  partAOptions: ItemOption[] = undefined;         // Initialize to undefined so that field is mapped

  @JsonProperty("partBPrompt", String)
  partBPrompt: string = undefined;                // Initialize to undefined so that field is mapped

  @JsonProperty("partBOptions", [ItemOption])
  partBOptions: ItemOption[] = undefined;         // Initialize to undefined so that field is mapped
}

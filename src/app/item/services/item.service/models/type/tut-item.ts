import {JsonObject, JsonProperty} from "json2typescript";
import {OtherItem} from "../base/item";
import {ItemContext} from "../base/item-context";
import {OtherItemCore} from "../base/item-core";

/**
 * TUT item context that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class TutItemContext extends ItemContext {
  @JsonProperty("item", TutItem)
  item: TutItem = undefined;                    // Initialize to undefined so that field is mapped
}

/**
 * TUT item that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class TutItem extends OtherItem {
  @JsonProperty("core", TutItemCore)
  core: TutItemCore = undefined;                // Initialize to undefined so that field is mapped
}

/**
 * TUT item core that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class TutItemCore extends OtherItemCore {
  @JsonProperty("content", String)
  content: string = undefined;                  // Initialize to undefined so that field is mapped
}

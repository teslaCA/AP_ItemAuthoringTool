import {JsonObject, JsonProperty} from "json2typescript";
import {OtherItem} from "../base/item";
import {ItemContext} from "../base/item-context";
import {OtherItemCore} from "../base/item-core";

/**
 * STIM item context that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class StimItemContext extends ItemContext {
  @JsonProperty("item", StimItem)
  item: StimItem = undefined;                   // Initialize to undefined so that field is mapped
}

/**
 * STIM item that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class StimItem extends OtherItem {
  @JsonProperty("core", StimItemCore)
  core: StimItemCore = undefined;               // Initialize to undefined so that field is mapped
}

/**
 * STIM item core that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class StimItemCore extends OtherItemCore {
  @JsonProperty("content", String)
  content: string = undefined;                 // Initialize to undefined so that field is mapped
}

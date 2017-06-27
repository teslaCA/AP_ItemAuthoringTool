import {JsonObject, JsonProperty} from "json2typescript";

import {Item} from "./item";

/**
 * STIM Item model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class StimItem extends Item {
  @JsonProperty("passage", [String])
  passage: string = undefined;          // Initialize to undefined so that field is mapped
}

import {JsonObject, JsonProperty} from "json2typescript";
import {NormalItem} from "./normal-item";

/**
 * WER Item model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class WerItem extends NormalItem {
  @JsonProperty("exemplarResponses", [String])
  exemplarResponses: string[] = undefined;          // Initialize to undefined so that field is mapped

  @JsonProperty("prompt", String)
  prompt: string = undefined;                       // Initialize to undefined so that field is mapped
}

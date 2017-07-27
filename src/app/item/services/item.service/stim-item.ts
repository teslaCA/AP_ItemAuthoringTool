import {JsonObject, JsonProperty} from "json2typescript";
import {OtherItem} from "./other-item";

/**
 * STIM Item model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class StimItem extends OtherItem {
  @JsonProperty("prompt", String)
  prompt: string = undefined;          // Initialize to undefined so that field is mapped

  get supportsStimulus(): boolean {
    return false;
  }

  get supportsTutorial(): boolean {
    return false;
  }
}

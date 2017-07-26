import {JsonProperty} from "json2typescript";
import {Item} from "./item";

/**
 * NormalItem base class for models that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
export abstract class NormalItem extends Item {
  @JsonProperty("stimulusId", String)
  stimulusId: string = undefined;             // Initialize to undefined so that field is mapped

  @JsonProperty("tutorialId", String)
  tutorialId: string = undefined;             // Initialize to undefined so that field is mapped
}

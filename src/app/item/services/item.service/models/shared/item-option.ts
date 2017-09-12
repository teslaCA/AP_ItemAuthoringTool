import {JsonObject, JsonProperty} from "json2typescript";

/**
 * ItemOption model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class ItemOption {
  @JsonProperty("isCorrectAnswer", Boolean)
  isCorrectAnswer: boolean = undefined;     // Initialize to undefined so that field is mapped

  @JsonProperty("text", String)
  text: string = undefined;                 // Initialize to undefined so that field is mapped
}

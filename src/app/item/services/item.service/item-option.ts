import {JsonObject, JsonProperty} from "json2typescript";

/**
 * ItemOption model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class ItemOption {
  @JsonProperty("text", String)
  text: string = undefined;               // Initialize to undefined so that field is mapped

  // TODO: IAT-32: Rename to "isCorrectAnswer" when corresponding changes have been made to IMS
  @JsonProperty("correctAnswer", Boolean)
  correctAnswer: boolean = undefined;     // Initialize to undefined so that field is mapped
}

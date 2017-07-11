import {JsonObject, JsonProperty} from "json2typescript";

/**
 * ItemWorkflowStatus model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class ItemWorkflowStatus {
  @JsonProperty("code", String)
  code: string = undefined;         // Initialize to undefined so that field is mapped

  @JsonProperty("label", String)
  label: string = undefined;        // Initialize to undefined so that field is mapped

  @JsonProperty("order", Number)
  order: string = undefined;        // Initialize to undefined so that field is mapped
}

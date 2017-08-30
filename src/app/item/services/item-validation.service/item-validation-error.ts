import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class ItemValidationError {
  @JsonProperty("category", String)
  category: string = undefined;        // Initialize to undefined so that field is mapped

  @JsonProperty("severity", String)
  severity: string = undefined;        // Initialize to undefined so that field is mapped

  @JsonProperty("message", String)
  message: string = undefined;        // Initialize to undefined so that field is mapped

  @JsonProperty("detail", String)
  detail: string = undefined;          // Initialize to undefined so that field is mapped
}

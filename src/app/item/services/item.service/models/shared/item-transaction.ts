import {JsonObject, JsonProperty} from "json2typescript";

/**
 * ItemTransaction model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class ItemTransaction {
  @JsonProperty("section", String)
  section: string = undefined;        // Initialize to undefined so that field is mapped

  @JsonProperty("userName", String)
  userName: string = undefined;       // Initialize to undefined so that field is mapped
}

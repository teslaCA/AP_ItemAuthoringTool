import {JsonObject, JsonProperty} from "json2typescript";

/**
 * ItemTransaction model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class ItemTransaction {
  @JsonProperty("transactionId", String)
  transactionId: string = undefined;  // Initialize to undefined so that field is mapped

  @JsonProperty("username", String)
  username: string = undefined;       // Initialize to undefined so that field is mapped
}

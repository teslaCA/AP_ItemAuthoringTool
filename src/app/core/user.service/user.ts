import {JsonObject, JsonProperty} from "json2typescript";

/**
 * User model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class User {
  @JsonProperty("fullName", String)
  fullName: string = undefined;   // Initialize to undefined so that field is mapped

  @JsonProperty("username", String)
  userName: string = undefined;   // Initialize to undefined so that field is mapped
}

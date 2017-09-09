import {JsonObject, JsonProperty} from "json2typescript";

/**
 * ItemVersion model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class ItemVersion {
  @JsonProperty("changedByFullName", String)
  changedByFullName: string = undefined;        // Initialize to undefined so that field is mapped

  @JsonProperty("changedByUserName", String)
  changedByUserName: string = undefined;        // Initialize to undefined so that field is mapped

  @JsonProperty("changedOn", String)
  changedOn: string = undefined;                // Initialize to undefined so that field is mapped

  @JsonProperty("historyId", String)
  historyId: string = undefined;                // Initialize to undefined so that field is mapped

  @JsonProperty("message", String)
  message: string = undefined;                  // Initialize to undefined so that field is mapped

  @JsonProperty("parentHistoryId", String, /* isOptional */ true)
  parentHistoryId: string = undefined;          // Initialize to undefined so that field is mapped
}

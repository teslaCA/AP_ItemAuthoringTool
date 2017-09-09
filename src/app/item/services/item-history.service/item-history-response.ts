import {JsonObject, JsonProperty} from "json2typescript";
import {ItemVersion} from "./item-version";

/**
 * ItemHistoryResponse model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class ItemHistoryResponse {
  @JsonProperty("versions", [ItemVersion])
  versions: ItemVersion[] = undefined;          // Initialize to undefined so that field is mapped
}

import {JsonObject, JsonProperty} from "json2typescript";
/**
 * ItemPreviewResponse. When an item rendering call is successful an Url is returned from the IRS service
 * This Url can be used to view the item in a browser/iframe
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */

@JsonObject
export class ItemPreviewResponse {
  @JsonProperty("renderUrl", String)
  renderUrl: string = undefined;
}

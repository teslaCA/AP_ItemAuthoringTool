import {JsonObject, JsonProperty} from "json2typescript";
import {ItemAttachment} from "./item-attachment";

/**
 * ItemTransaction model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class ItemCc {
    @JsonProperty("attachments", [ItemAttachment])
    attachments: ItemAttachment[] = undefined;

    @JsonProperty("isCcRequired", Boolean)
    isCcRequired: boolean = undefined;          // Initialize to undefined so that field is mapped

    @JsonProperty("isCcProvided", Boolean)
    isCcProvided: boolean = undefined;          // Initialize to undefined so that field is mapped
}

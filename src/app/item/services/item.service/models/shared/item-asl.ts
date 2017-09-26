import {JsonObject, JsonProperty} from "json2typescript";
import {ItemAttachment} from "./item-attachment";

/**
 * ItemTransaction model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class ItemAsl {
    @JsonProperty("attachments", [ItemAttachment])
    attachments: ItemAttachment[] = undefined;

    @JsonProperty("aslRequired", String)
    isAslRequired: string = undefined;          // Initialize to undefined so that field is mapped

    @JsonProperty("isAslProvided", Boolean)
    isAslProvided: boolean = undefined;          // Initialize to undefined so that field is mapped
}

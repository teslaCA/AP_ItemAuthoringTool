import {JsonObject, JsonProperty} from "json2typescript";
import {ItemOption} from "./item-option";

// TODO: Remove; not needed now that EBSR item type has been flattened
@JsonObject
export class ItemPart {
  @JsonProperty("prompt", String)
  prompt: string = undefined;           // Initialize to undefined so that field is mapped

  @JsonProperty("options", [ItemOption])
  options: ItemOption[] = undefined;    // Initialize to undefined so that field is mapped
}

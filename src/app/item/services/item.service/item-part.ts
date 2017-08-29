import {JsonObject, JsonProperty} from "json2typescript";
import {ItemOption} from "./item-option";

// TODO: Move to EbsrItem's file and rename to something less generic (see TiItem for example).
@JsonObject
export class ItemPart {
  @JsonProperty("prompt", String)
  prompt: string = undefined;

  @JsonProperty("options", [ItemOption])
  options: ItemOption[] = undefined;    // Initialize to undefined so that field is mapped
}

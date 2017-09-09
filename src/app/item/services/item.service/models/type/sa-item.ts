import {JsonObject, JsonProperty} from "json2typescript";
import {AssessmentItemCore} from "../base/item-core";
import {ItemContext} from "../base/item-context";
import {AssessmentItem} from "../base/item";

@JsonObject
export class SaItemContext extends ItemContext {
  @JsonProperty("item", SaItem)
  item: SaItem = undefined;                     // Initialize to undefined so that field is mapped
}

@JsonObject
export class SaItem extends AssessmentItem {
  @JsonProperty("core", SaItemCore)
  core: SaItemCore = undefined;                 // Initialize to undefined so that field is mapped
}

@JsonObject
export class SaItemCore extends AssessmentItemCore {
  @JsonProperty("exemplarResponses", [String])
  exemplarResponses: string[] = undefined;      // Initialize to undefined so that field is mapped

  @JsonProperty("prompt", String)
  prompt: string = undefined;                   // Initialize to undefined so that field is mapped
}

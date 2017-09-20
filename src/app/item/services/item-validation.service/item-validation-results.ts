import {JsonObject, JsonProperty} from "json2typescript";
import {ItemValidationResult} from "./item-validation-result";

@JsonObject
export class ItemValidationResults {
  @JsonProperty("validationResultsStale", Boolean)
  areValidationResultsStale: boolean = true;

  @JsonProperty("validatedCommitMessage", String)
  validatedCommitMessage: string = undefined;        // Initialize to undefined so that field is mapped

  @JsonProperty("validatedCommitUserName", String)
  validatedCommitUserName: string = undefined;        // Initialize to undefined so that field is mapped

  @JsonProperty("validationDateTime", String)
  validationDateTime: string = undefined;          // Initialize to undefined so that field is mapped

  @JsonProperty("validationResults", [ItemValidationResult])
  validationResults: ItemValidationResult[] = undefined;          // Initialize to undefined so that field is mapped
}

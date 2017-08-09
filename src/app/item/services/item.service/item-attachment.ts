import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class ItemAttachment {
  @JsonProperty("fileName", String)
  fileName: string = undefined;

  @JsonProperty("uploadedDate", String)
  uploadedDate: string = undefined;

  @JsonProperty("isaapCodes", [String])
  isaapCodes: string[] = undefined;
}

import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject
export class ItemAttachment {
  @JsonProperty("fileName", String)
  fileName: string = undefined;

  @JsonProperty("uploadedDate", String)
  uploadedDate: string = undefined;

  @JsonProperty("type", String)
  type: string = undefined;

  @JsonProperty("subtype", String)
  subtype: string = undefined;


}

import {JsonObject, JsonProperty} from "json2typescript";
import {NormalItem} from "./normal-item";

/**
 * TI Item model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class TiItem extends NormalItem {
  @JsonProperty("prompt", String)
  prompt: string = undefined;                       // Initialize to undefined so that field is mapped

  @JsonProperty("table", TiItemTable)
  table: TiItemTable = undefined;                   // Initialize to undefined so that field is mapped
}

@JsonObject
export class TiItemTable {
  @JsonProperty("title", String)
  title: string = undefined;                        // Initialize to undefined so that field is mapped

  @JsonProperty("columns", [TiItemTableColumn])
  columns: TiItemTableColumn[] = undefined;         // Initialize to undefined so that field is mapped

  @JsonProperty("rows", [TiItemTableRow])
  rows: TiItemTableRow[] = undefined;               // Initialize to undefined so that field is mapped
}

@JsonObject
export class TiItemTableColumn {
  @JsonProperty("label", String)
  label: string = undefined;                        // Initialize to undefined so that field is mapped
}

@JsonObject
export class TiItemTableRow {
  @JsonProperty("cells", [TiItemTableRowCell])
  cells: TiItemTableRowCell[] = undefined;          // Initialize to undefined so that field is mapped
}

@JsonObject
export class TiItemTableRowCell {
  @JsonProperty("type", String)
  type: string = undefined;                         // Initialize to undefined so that field is mapped

  @JsonProperty("value", String)
  value: string = undefined;                        // Initialize to undefined so that field is mapped
}

import {JsonObject, JsonProperty} from "json2typescript";
import {AssessmentItem} from "../base/item";
import {ItemContext} from "../base/item-context";
import {AssessmentItemCore} from "../base/item-core";

/**
 * TI item context that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class TiItemContext extends ItemContext {
  @JsonProperty("item", TiItem)
  item: TiItem = undefined;                         // Initialize to undefined so that field is mapped
}

/**
 * TI item that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class TiItem extends AssessmentItem {
  @JsonProperty("core", TiItemCore)
  core: TiItemCore = undefined;                     // Initialize to undefined so that field is mapped
}

/**
 * TI item core that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class TiItemCore extends AssessmentItemCore {
  @JsonProperty("prompt", String)
  prompt: string = undefined;                       // Initialize to undefined so that field is mapped

  @JsonProperty("table", TiItemTable)
  table: TiItemTable = undefined;                   // Initialize to undefined so that field is mapped
}

/**
 * TI item table that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class TiItemTable {
  @JsonProperty("title", String)
  title: string = undefined;                        // Initialize to undefined so that field is mapped

  @JsonProperty("columns", [TiItemTableColumn])
  columns: TiItemTableColumn[] = undefined;         // Initialize to undefined so that field is mapped

  @JsonProperty("rows", [TiItemTableRow])
  rows: TiItemTableRow[] = undefined;               // Initialize to undefined so that field is mapped
}

/**
 * TI item table column that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class TiItemTableColumn {
  @JsonProperty("label", String)
  label: string = undefined;                        // Initialize to undefined so that field is mapped
}

/**
 * TI item table row that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class TiItemTableRow {
  @JsonProperty("cells", [TiItemTableRowCell])
  cells: TiItemTableRowCell[] = undefined;          // Initialize to undefined so that field is mapped
}

/**
 * TI item table row cell that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class TiItemTableRowCell {
  @JsonProperty("type", String)
  type: string = undefined;                         // Initialize to undefined so that field is mapped

  @JsonProperty("value", String)
  value: string = undefined;                        // Initialize to undefined so that field is mapped
}

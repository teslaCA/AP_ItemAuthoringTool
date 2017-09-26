import {JsonObject, JsonProperty} from "json2typescript";
import {AssessmentItem} from "../base/item";
import {ItemContext} from "../base/item-context";
import {AssessmentItemCore} from "../base/item-core";

/**
 * MI item context that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class MiItemContext extends ItemContext {
  @JsonProperty("item", MiItem)
  item: MiItem = undefined;                         // Initialize to undefined so that field is mapped
}

/**
 * MI item that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class MiItem extends AssessmentItem {
  @JsonProperty("core", MiItemCore)
  core: MiItemCore = undefined;                     // Initialize to undefined so that field is mapped
}

/**
 * MI item core that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class MiItemCore extends AssessmentItemCore {
  @JsonProperty("prompt", String)
  prompt: string = undefined;                       // Initialize to undefined so that field is mapped

  @JsonProperty("table", MiItemTable)
  table: MiItemTable = undefined;                   // Initialize to undefined so that field is mapped
}

/**
 * MI item table that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class MiItemTable {
  @JsonProperty("title", String)
  title: string = undefined;                        // Initialize to undefined so that field is mapped

  @JsonProperty("columns", [MiItemTableColumn])
  columns: MiItemTableColumn[] = undefined;         // Initialize to undefined so that field is mapped

  @JsonProperty("rows", [MiItemTableRow])
  rows: MiItemTableRow[] = undefined;               // Initialize to undefined so that field is mapped
}

/**
 * MI item table column that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class MiItemTableColumn {
  @JsonProperty("label", String)
  label: string = undefined;                        // Initialize to undefined so that field is mapped
}

/**
 * MI item table row that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class MiItemTableRow {
  @JsonProperty("cells", [MiItemTableRowCell])
  cells: MiItemTableRowCell[] = undefined;          // Initialize to undefined so that field is mapped
}

/**
 * MI item table row cell that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
@JsonObject
export class MiItemTableRowCell {
  @JsonProperty("type", String)
  type: string = undefined;                         // Initialize to undefined so that field is mapped

  @JsonProperty("value", Boolean)
  value = false;                                    // Initialize to undefined so that field is mapped
}

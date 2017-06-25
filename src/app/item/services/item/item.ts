import {JsonConvert, JsonProperty} from "json2typescript";

import {ItemTransaction} from "./item-transaction";
import {SaItem} from "./sa-item";
import {WerItem} from "./wer-item";

/**
 * Item base class for models that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
export abstract class Item {
  @JsonProperty("createTransaction", ItemTransaction, /* isOptional */ true)
  createTransaction: ItemTransaction = undefined;   // Initialize to undefined so that field is mapped

  @JsonProperty("editTransaction", ItemTransaction, /* isOptional */ true)
  editTransaction: ItemTransaction = undefined;     // Initialize to undefined so that field is mapped

  @JsonProperty("id", String)
  id: string = undefined;                           // Initialize to undefined so that field is mapped

  @JsonProperty("type", String)
  type: string = undefined;                         // Initialize to undefined so that field is mapped

  get currentTransaction(): ItemTransaction {
    return this.createTransaction || this.editTransaction;
  }
}

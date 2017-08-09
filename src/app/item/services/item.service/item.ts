import {JsonProperty} from "json2typescript";

import {ItemTransaction} from "./item-transaction";
import {ItemType} from "../item-type.service/item-type";
import {ItemBraille} from "./item-braille";

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

  @JsonProperty("workflowStatusCode", String)
  workflowStatusCode: string = undefined;           // Initialize to undefined so that field is mapped

  @JsonProperty("braille", ItemBraille, false)
  braille: ItemBraille = undefined;

  itemType: ItemType;

  get currentTransaction(): ItemTransaction {
    return this.createTransaction || this.editTransaction;
  }

  get isBeingCreated(): boolean {
    return !!this.createTransaction;
  }

  get isBeingEdited(): boolean {
    return !!this.editTransaction;
  }

  get supportsPreview(): boolean {
    return true;
  }

  get supportsStimulus(): boolean {
    return true;
  }

  get supportsWorkflow(): boolean {
    return true;
  }

  get supportsTutorial(): boolean {
    return true;
  }

  isBeingCreatedBy(username: string): boolean {
    return this.isBeingCreated
      && this.createTransaction.username === username;
  }

  isBeingEditedBy(username: string): boolean {
    return this.isBeingEdited
      && this.editTransaction.username === username;
  }
}

import {JsonProperty} from "json2typescript";

import {ItemTransaction} from "../shared/item-transaction";
import {Item} from "./item";

/**
 * ItemContext model that can be mapped to/from JSON.
 *
 * Important: Fields must be initialized to a value or undefined to take part in mapping.
 * See https://github.com/dhlab-basel/json2typescript for more info.
 */
export abstract class ItemContext {
  @JsonProperty("item", Item)
  item: Item = undefined;                         // Initialize to undefined so that field is mapped

  @JsonProperty("transactions", [ItemTransaction])
  transactions: ItemTransaction[] = undefined;    // Initialize to undefined so that field is mapped

  get currentTransaction(): ItemTransaction {
    return this.transactions.length == 0 ? null : this.transactions[0];
  }

  canUserChangeSection(userName: string, section: string): boolean {
    return this.isBeingCreatedBy(userName)
      || this.isSectionBeingEditedBy(section, userName);
  }

  // ---------- Creating properties ----------
  get isBeingCreated(): boolean {
    return this.transactions.some(t => t.section === "create");
  }

  isBeingCreatedBy(userName: string): boolean {
    return this.transactions.some(t => t.section === "create" && t.userName === userName);
  }

  get creatorUserName(): string {
    return this.isBeingCreated
      ? this.transactions.find(t => t.section === "create").userName
      : null;
  }

  // ---------- Editing properties ----------
  isSectionBeingEdited(section: string): boolean {
    return this.transactions.some(t => t.section === section);
  }

  isSectionBeingEditedBy(section: string, userName: string): boolean {
    return this.transactions.some(t => t.section === section && t.userName === userName);
  }

  isAnySectionBeingEditedBy(userName: string): boolean {
    return this.transactions.some(t => t.userName === userName);
  }

  getSectionEditorUserName(section: string): string {
    return this.isSectionBeingEdited(section)
      ? this.transactions.find(t => t.section === section).userName
      : null;
  }
}

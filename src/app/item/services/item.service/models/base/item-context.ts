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

  get isAnyUserCreatingItem(): boolean {
    return this.transactions.some(t => t.section === "create");
  }

  isUserCreatingItem(userName: string): boolean {
    return this.transactions.some(t => t.section === "create" && t.userName === userName);
  }

  isAnyUserEditingSection(section: string): boolean {
    return this.transactions.some(t => t.section === section);
  }

  isUserEditingSection(userName: string, section: string): boolean {
    return this.transactions.some(t => t.userName === userName && t.section === section);
  }

  isUserEditingAnySection(userName: string): boolean {
    return this.transactions.some(t => t.userName === userName);
  }

  isUserEditingDifferentSection(userName: string, section: string): boolean {
    return !this.isUserCreatingItem(userName)
      && !this.isUserEditingSection(userName, section)
      && this.isUserEditingAnySection(userName);
  }

  isDifferentUserEditingSection(userName: string, section: string): boolean {
    return !this.isUserEditingSection(userName, section)
      && this.isAnyUserEditingSection(section);
  }

  isUserCreatingItemOrEditingSection(userName: string, section: string): boolean {
    return this.isUserCreatingItem(userName)
      || this.isUserEditingSection(userName, section);
  }

  canUserBeginEditingSection(userName: string, section: string): boolean {
    return !this.isAnyUserEditingSection(section)
      && !this.isUserEditingAnySection(userName);
  }

  getUserEditingSection(section: string): string {
    return this.isAnyUserEditingSection(section)
      ? this.transactions.find(t => t.section === section).userName
      : null;
  }

  getSectionBeingEditedByUser(userName: string): string {
    return this.transactions.find(t => t.userName === userName).section;
  }
}

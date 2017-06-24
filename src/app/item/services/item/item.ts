import {Transaction} from "./transaction";

export abstract class Item {
  createTransaction: Transaction;
  editTransaction: Transaction;
  id: string;
  // TODO: Replace "type" with "type()" after changing all service methods to return strongly typed objects
  //abstract get type(): string;
  type: string;
}

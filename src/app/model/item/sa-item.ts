import {NewItem} from "./new-item";

export class SaItem extends NewItem {

  exemplarResponses: string[];

  prompt: string;

  get type(): string {
    return "sa";
  }
}

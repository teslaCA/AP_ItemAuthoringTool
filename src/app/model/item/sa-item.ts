import {Item} from "./item";

export class SaItem extends Item {

  exemplarResponses: string[];

  prompt: string;

  get type(): string {
    return "sa";
  }
}

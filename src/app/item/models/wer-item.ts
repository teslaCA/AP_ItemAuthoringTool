import {Item} from "./item";

export class WerItem extends Item {
  exemplarResponses: string[];
  prompt: string;

  get type(): string {
    return "wer";
  }
}

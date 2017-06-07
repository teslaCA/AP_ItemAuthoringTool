export abstract class Item {

  beingCreatedBy: string;

  beingEditedBy: string;

  id: number;

  abstract get type(): string;
}

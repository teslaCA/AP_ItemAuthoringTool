export abstract class Item {

  beingCreatedBy: string;

  beingEditedBy: string;

  id: string;

  abstract get type(): string;
}

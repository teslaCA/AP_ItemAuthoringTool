export abstract class NewItem {

  beingCreatedBy: string;

  beingEditedBy: string;

  id: number;

  abstract get type(): string;
}

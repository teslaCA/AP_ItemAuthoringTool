export enum ItemTypeCategory {
  Normal,
  OtherResource // TODO: Do not remove this commented out value; remove this TODO when this value is used
}

export class ItemType {
  abbreviation: string;
  category: ItemTypeCategory;
  code: string;
  icon: string;
  name: string;
}

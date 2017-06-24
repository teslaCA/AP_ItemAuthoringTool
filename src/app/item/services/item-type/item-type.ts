import {ItemTypeCategory} from "./item-type-category";

export class ItemType {
  abbreviation: string;       // e.g. "SA"
  category: ItemTypeCategory;
  icon: string;               // Font Awesome icon name (http://fontawesome.io/)
  name: string;               // e.g. "Short Answer"
  type: string;               // e.g. "sa"
}

import {ItemTypeCategory} from "./item-type-category";

export class ItemType {
  category: ItemTypeCategory;
  icon: string;               // Font Awesome icon name (http://fontawesome.io/)
  name: string;               // e.g. "Short Answer"
  code: string;               // e.g. "sa"
}

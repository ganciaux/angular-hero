import { ItemModel } from "../inventory/inventory.model";

export interface ChestItemModel extends ItemModel {
  description: string;
}
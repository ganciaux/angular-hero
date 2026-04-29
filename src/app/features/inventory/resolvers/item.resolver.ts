import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ItemModel } from '../inventory.model';
import { InventoryService } from '../inventory.service';

export const itemResolver: ResolveFn<ItemModel | undefined> = (route) => {
  const inventoryService = inject(InventoryService);
  const id = route.paramMap.get('id') ?? '';
  return inventoryService.findItemById(id);
};
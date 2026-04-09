import { Component, inject } from '@angular/core';
import { InventoryService } from './inventory.service';
import { ItemCard } from './item-card/item-card';
import { AddItemForm } from './add-item-form/add-item-form';

@Component({
  selector: 'app-inventory',
  imports: [ItemCard, AddItemForm],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class Inventory {
  protected readonly inventoryService = inject(InventoryService);
}

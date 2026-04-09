import { Component, inject } from '@angular/core';
import { InventoryService } from './inventory.service';
import { ItemCard } from './item-card/item-card';

@Component({
  selector: 'app-inventory',
  imports: [ItemCard],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class Inventory {
  protected readonly inventoryService = inject(InventoryService);
}

import { Component, inject } from '@angular/core';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  imports: [],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class Inventory {
  protected readonly inventoryService = inject(InventoryService);
}

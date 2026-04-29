import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class Inventory {
  private readonly inventoryService = inject(InventoryService);
  constructor() {
    this.inventoryService.loadItems();
  }
}

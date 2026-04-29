import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemModel } from '../inventory.model';
import { ItemCard } from '../item-card/item-card';

@Component({
  selector: 'app-inventory-detail',
  imports: [ItemCard],
  templateUrl: './inventory-detail.html',
  styleUrl: './inventory-detail.scss',
})
export class InventoryDetail {
  private route = inject(ActivatedRoute);
  protected item = this.route.snapshot.data['item'] as ItemModel | undefined;
}

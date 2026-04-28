import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { ItemModel } from '../inventory.model';
import { ItemCard } from '../item-card/item-card';

@Component({
  selector: 'app-inventory-detail',
  imports: [ItemCard],
  templateUrl: './inventory-detail.html',
  styleUrl: './inventory-detail.scss',
})
export class InventoryDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private inventoryService = inject(InventoryService);
  protected item = signal<ItemModel|undefined>(undefined);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.item.set(this.inventoryService.findItemById(id))
  }
}

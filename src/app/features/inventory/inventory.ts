import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { InventoryService } from './inventory.service';
import { ItemCard } from './item-card/item-card';
import { AddItemForm } from './add-item-form/add-item-form';

@Component({
  selector: 'app-inventory',
  imports: [ItemCard, AddItemForm],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class Inventory implements AfterViewInit {
  protected readonly inventoryService = inject(InventoryService);
  @ViewChild('searchInput') searchInput!: ElementRef;
  
  ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
  }
}

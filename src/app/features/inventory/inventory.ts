import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { InventoryService } from './inventory.service';
import { ItemCard } from './item-card/item-card';
import { AddItemForm } from './add-item-form/add-item-form';
import { Panel } from "../../shared/components/panel/panel";

@Component({
  selector: 'app-inventory',
  imports: [ItemCard, AddItemForm, Panel],
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

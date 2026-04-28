import { Component, inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { ItemCard } from '../item-card/item-card';
import { AddItemForm } from '../add-item-form/add-item-form';
import { Modal } from '../../../shared/components/modal/modal';
import { Panel } from '../../../shared/components/panel/panel';

@Component({
  selector: 'app-inventory-list',
  imports: [ItemCard, AddItemForm, Panel, Modal],
  templateUrl: './inventory-list.html',
  styleUrl: './inventory-list.scss',
})
export class InventoryList implements AfterViewInit {
  protected readonly inventoryService = inject(InventoryService);
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild(Modal) inventoryModal!: Modal;
  
  ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
  }

  openModal() {
    this.inventoryModal.open();
  }
}

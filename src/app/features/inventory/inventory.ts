import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { InventoryService } from './inventory.service';
import { ItemCard } from './item-card/item-card';
import { AddItemForm } from './add-item-form/add-item-form';
import { Panel } from "../../shared/components/panel/panel";
import { Modal } from '../../shared/components/modal/modal';

@Component({
  selector: 'app-inventory',
  imports: [ItemCard, AddItemForm, Panel, Modal],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class Inventory implements AfterViewInit {
  protected readonly inventoryService = inject(InventoryService);
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild(Modal) inventoryModal!: Modal;
  
  ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
  }

  openModal() {
    this.inventoryModal.open();
  }
}

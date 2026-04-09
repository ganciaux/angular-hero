import { Injectable, signal } from '@angular/core';
import { ItemModel } from './inventory.model';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private _items = signal<ItemModel[]>([
    { id: crypto.randomUUID(), name: 'item 1', type: 'divers', quantity: 1 },
    { id: crypto.randomUUID(), name: 'item 2', type: 'potion', quantity: 2 },
    { id: crypto.randomUUID(), name: 'item 3', type: 'sword', quantity: 2 },
  ]);

  readonly items = this._items.asReadonly();

  addItem(item:ItemModel) {
    this._items.update(items => [...items, item]);
  }

  removeItem(id: string) {
    this._items.update(items => items.filter(item => item.id !== id));
  }

  findItemById(id: string): ItemModel | undefined {
    return this._items().find(item => item.id === id);
  }
}

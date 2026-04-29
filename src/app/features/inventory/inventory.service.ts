import { inject, Injectable, signal } from '@angular/core';
import { ItemModel } from './inventory.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private readonly httpClient = inject(HttpClient);

  private _items = signal<ItemModel[]>([]);

  readonly items = this._items.asReadonly();

  loadItems() {
    this.httpClient.get<ItemModel[]>('http://localhost:3000/inventory').subscribe(items => {
      this._items.set(items);
    });
  }

  addItem(item:ItemModel) {
    this._items.update(items => [...items, item]);
  }

  removeItem(id: string) {
    this._items.update(items => items.filter(item => item.id !== id));
  }

  findItemById(id: string): ItemModel | undefined {
    return this._items().find(item => item.id === id);
  }

  toggleEquip(id: string) {
    this._items.update(items => items.map(item => {
      if (item.id === id) {
        return { ...item, equipped: !item.equipped };
      }
      return item;
    }));
  }
}

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

  addItem(item: Omit<ItemModel, 'id'>) {
    this.httpClient.post<ItemModel>('http://localhost:3000/inventory', item).subscribe(newItem => {
      this._items.update(items => [...items, newItem]);
    });
  }

  removeItem(id: string) {
    this.httpClient.delete(`http://localhost:3000/inventory/${id}`).subscribe(() => {
      this._items.update(items => items.filter(item => item.id !== id));
    });
  }

  findItemById(id: string): ItemModel | undefined {
    return this._items().find(item => item.id === id);
  }

  toggleEquip(id: string) {
    const item = this.findItemById(id);
    if (!item) {
      return;
    }
    this.httpClient.patch<ItemModel>(`http://localhost:3000/inventory/${id}`, { equipped: !item.equipped })
      .subscribe(updated => {
        this._items.update(items => items.map(i => i.id === id ? updated : i));
      });

  }
}

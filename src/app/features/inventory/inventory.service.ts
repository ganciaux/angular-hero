import { inject, Injectable, signal } from '@angular/core';
import { ItemModel } from './inventory.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private readonly httpClient = inject(HttpClient);

  private _items = signal<ItemModel[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);
  
  readonly items = this._items.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  loadItems() {
    this._loading.set(true);
    this._error.set(null);
    this.httpClient.get<ItemModel[]>('http://localhost:3000/inventory').subscribe({
      next: (items) => {
        this._items.set(items);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      }
    });
  }

  addItem(item: Omit<ItemModel, 'id'>) {
    this._loading.set(true);
    this._error.set(null);
    this.httpClient.post<ItemModel>('http://localhost:3000/inventory', item).subscribe({
      next: (newItem) => {
        this._items.update(items => [...items, newItem]);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      }
    })
  }

  removeItem(id: string) {
    this._loading.set(true);
    this._error.set(null);
    this.httpClient.delete(`http://localhost:3000/inventory/${id}`).subscribe({
      next: () => {
        this._items.update(items => items.filter(item => item.id !== id));
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set(err.message);
        this._loading.set(false);
      }
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

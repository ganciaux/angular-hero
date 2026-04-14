import { Injectable, signal } from '@angular/core';
import { ChestItemModel } from './chest.model';
import { CHEST_ITEM_LIST } from './chest.item.data';

@Injectable({
  providedIn: 'root',
})
export class ChestService {
  private items = signal<ChestItemModel[]>(CHEST_ITEM_LIST);
  private _chestItems = signal<ChestItemModel[]>([]);
  readonly chestItems = this._chestItems.asReadonly();

  constructor() {
    this.pickRandomItems(3);
  }

  pickRandomItems(numberOfItems: number) { 
    const allItems = this.items();
    const shuffledItems = [...allItems].sort(() => 0.5 - Math.random());
    this._chestItems.set(shuffledItems.slice(0, numberOfItems));
  }
}

import { effect, inject, Injectable, signal } from '@angular/core';
import { JournalEntry } from './journal.model';
import { HeroService } from '../hero/hero.service';
import { HeroModel } from '../hero/hero.model';
import { InventoryService } from '../inventory/inventory.service';
import { ItemModel } from '../inventory/inventory.model';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private _entries = signal<JournalEntry[]>([]);
  private heroService = inject(HeroService);
  private inventoryService = inject(InventoryService);
  readonly entries = this._entries.asReadonly();
  private previousHero: HeroModel | null = null;
  private previousItems: ItemModel[] = [];

  constructor() {
    effect(() => this._itemEffect());

    effect(() => this._heroEffect());
  }

  private _itemEffect() {
    const current = this.inventoryService.items();

      if (current.length != this.previousItems.length) {
        this._addEntry({
          id: crypto.randomUUID(),
          date: new Date(),
          content: `Inventory ${current.length > this.previousItems.length ? 'gained' : 'lost'} an item!`,
          type: 'equip',
        });
      }


    current.forEach((item) => {
      const prev = this.previousItems.find((i) => i.id === item.id);
      if (prev && item.equipped !== prev.equipped) {
        this._addEntry({
          id: crypto.randomUUID(),
          date: new Date(),
          content: `${item.name} ${item.equipped ? 'equipped' : 'unequipped'}`,
          type: 'equip',
        });
      }
    });

    this.previousItems = current;
  }

  private _heroEffect() {
    const current = this.heroService.hero();
    const date = new Date();

    if (this.previousHero) {
      if (current.xp > this.previousHero.xp) {
        this._addEntry({
          id: crypto.randomUUID(),
          date,
          content: `${current.name} gained XP!`,
          type: 'xp',
        });
      }

      if (current.hp < this.previousHero.hp) {
        this._addEntry({
          id: crypto.randomUUID(),
          date,
          content: `${current.name} lost HP!`,
          type: 'hp',
        });
      }

      if (current.hp > this.previousHero.hp) {
        this._addEntry({
          id: crypto.randomUUID(),
          date,
          content: `${current.name} gained HP!`,
          type: 'hp',
        });
      }

      if (current.level > this.previousHero.level) {
        this._addEntry({
          id: crypto.randomUUID(),
          date,
          content: `${current.name} leveled up!`,
          type: 'level',
        });
      }
    }

    this.previousHero = current;
  }

  private _addEntry(entry: JournalEntry) {
    this._entries.update((entries) => [entry, ...entries]);
  }
}

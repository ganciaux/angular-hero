import { computed, Injectable, signal } from '@angular/core';
import { AdventurerModel } from './tavern.model';

@Injectable({
  providedIn: 'root',
})
export class TavernService {
  private _adventurer = signal<AdventurerModel[]>([
    { id: crypto.randomUUID(), name: 'a1', level: 1, type: 'warrior', stats: { xp: 0, hp: 100, strength: 10, intelligence: 5 } },
    { id: crypto.randomUUID(), name: 'a2', level: 1, type: 'warrior', stats: { xp: 0, hp: 100, strength: 10, intelligence: 5 } },
    { id: crypto.randomUUID(), name: 'a3', level: 1, type: 'elf', stats: { xp: 0, hp: 80, strength: 5, intelligence: 15 } },
    { id: crypto.randomUUID(), name: 'a4', level: 2, type: 'magician', stats: { xp: 0, hp: 60, strength: 3, intelligence: 20 } },
    { id: crypto.randomUUID(), name: 'a5', level: 2, type: 'warrior', stats: { xp: 0, hp: 120, strength: 15, intelligence: 5 } },
    { id: crypto.randomUUID(), name: 'a6', level: 3, type: 'elf', stats: { xp: 0, hp: 90, strength: 7, intelligence: 18 } },
  ]);

  private name = signal('');
  private sortAsc = signal(true);
  private type = signal('all');

  readonly adventurers = computed(() => {
    const list = this._adventurer().filter((adv) => {
      const bName = adv.name.includes(this.name());
      const bType = this.type() == 'all' || adv.type == this.type();
      return bName && bType;
    });
    const sortedList = list.sort((a, b) =>
      this.sortAsc() ? a.level - b.level : b.level - a.level,
    );
    return sortedList;
  });

  filter(criteria: { name: string; type: string; sortAsc: boolean }) {
    this.name.set(criteria.name);
    this.sortAsc.set(criteria.sortAsc);
    this.type.set(criteria.type);
  }

  getAdventurer(id: string): AdventurerModel | null {
    return this._adventurer().find((adv) => adv.id === id) || null;
  }
}

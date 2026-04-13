import { Component, inject, signal } from '@angular/core';
import { TavernService } from './tavern.service';
import { FormsModule } from '@angular/forms';
import { AdventurerList } from './adventurer-list/adventurer-list';
import { AdventurerModel } from './tavern.model';
import { AdventurerCard } from './adventurer-card/adventurer-card';

@Component({
  selector: 'app-tavern',
  imports: [FormsModule, AdventurerList, AdventurerCard],
  templateUrl: './tavern.html',
  styleUrl: './tavern.scss',
})
export class Tavern {
  protected readonly taverneService = inject(TavernService);
  name = '';
  sortAsc = 'asc';
  type = 'all';

  protected selectedAdventurer = signal<AdventurerModel | null>(null);

  formChange() {
    const sortAsc = this.sortAsc === 'asc';

    this.taverneService.filter({ name: this.name, type: this.type, sortAsc });

    if (this.selectedAdventurer()){
      if (!this.taverneService.adventurers().find((adv) => adv.id === this.selectedAdventurer()!.id)) {
        this.selectedAdventurer.set(null);
      } 
    }
  }

  onSelectAdventurer(id: string) {
    this.selectedAdventurer.set(this.taverneService.getAdventurer(id));
  }
}

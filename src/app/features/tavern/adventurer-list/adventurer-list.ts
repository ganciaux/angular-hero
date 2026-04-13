import { Component, input, output } from '@angular/core';
import { AdventurerModel } from '../tavern.model';

@Component({
  selector: 'app-adventurer-list',
  imports: [],
  templateUrl: './adventurer-list.html',
  styleUrl: './adventurer-list.scss',
})
export class AdventurerList {
  adventurers = input.required<AdventurerModel[]>();
  selectedAdventurerId = output<string>();

  selectAdventurer(id: string) {
    this.selectedAdventurerId.emit(id);
  }
}

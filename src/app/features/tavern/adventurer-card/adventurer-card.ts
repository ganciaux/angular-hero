import { Component, input } from '@angular/core';
import { AdventurerModel } from '../tavern.model';

@Component({
  selector: 'app-adventurer-card',
  imports: [],
  templateUrl: './adventurer-card.html',
  styleUrl: './adventurer-card.scss',
})
export class AdventurerCard {
  adventurer = input.required<AdventurerModel>();
}

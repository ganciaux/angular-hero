import { Component, input } from '@angular/core';
import { LegendModel } from '../legend.model';

@Component({
  selector: 'app-legend-card',
  imports: [],
  templateUrl: './legend-card.html',
  styleUrl: './legend-card.scss',
})
export class LegendCard {
  legend = input<LegendModel | null>(null);
}

import { Component, input, output } from '@angular/core';
import { ItemModel } from '../inventory.model';

@Component({
  selector: 'app-item-card',
  imports: [],
  templateUrl: './item-card.html',
  styleUrl: './item-card.scss',
})
export class ItemCard {
  readonly item = input.required<ItemModel>();
  removed = output<string>();
}

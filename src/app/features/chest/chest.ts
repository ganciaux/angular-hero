import { Component, inject } from '@angular/core';
import { ChestService } from './chest.service';
import { ItemCard } from "../inventory/item-card/item-card";

@Component({
  selector: 'app-chest',
  imports: [ItemCard],
  templateUrl: './chest.html',
  styleUrl: './chest.scss',
})
export class Chest {
  protected readonly chestService = inject(ChestService);
}

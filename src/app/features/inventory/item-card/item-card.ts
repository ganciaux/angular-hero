import { Component, input, output } from '@angular/core';
import { ItemModel } from '../inventory.model';
import { ItemTypePipe } from '../pipes/item-type/item-type.pipe';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-item-card',
  imports: [ItemTypePipe, TitleCasePipe, UpperCasePipe, RouterLink],
  templateUrl: './item-card.html',
  styleUrl: './item-card.scss',
})
export class ItemCard {
  readonly item = input.required<ItemModel>();
  removed = output<string>();
  equipped = output<string>();
  showLink = input<boolean>(false);
}

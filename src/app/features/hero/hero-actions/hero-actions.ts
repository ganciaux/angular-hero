import { Component, output } from '@angular/core';

@Component({
  selector: 'app-hero-actions',
  imports: [],
  templateUrl: './hero-actions.html',
  styleUrl: './hero-actions.scss',
})
export class HeroActions {
  gainXP = output<void>();
  takeDamage = output<void>();
  heal = output<void>();
}

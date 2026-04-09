import { Component, computed, input } from '@angular/core';
import { HeroModel } from '../hero.model';

@Component({
  selector: 'app-hero-stats',
  imports: [],
  templateUrl: './hero-stats.html',
  styleUrl: './hero-stats.scss',
})
export class HeroStats {
  hero = input.required<HeroModel>();

  isAlive = computed(() => this.hero().hp > 0);

}

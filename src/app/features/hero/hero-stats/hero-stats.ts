import { Component, computed, input } from '@angular/core';
import { HeroModel } from '../hero.model';
import { StatBar } from '../../../shared/components/stat-bar/stat-bar';

@Component({
  selector: 'app-hero-stats',
  imports: [StatBar],
  templateUrl: './hero-stats.html',
  styleUrl: './hero-stats.scss',
})
export class HeroStats {
  hero = input.required<HeroModel>();

  isAlive = computed(() => this.hero().hp > 0);

}

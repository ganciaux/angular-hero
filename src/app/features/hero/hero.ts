import { Component, inject } from '@angular/core';
import { HeroStats } from './hero-stats/hero-stats';
import { HeroActions } from './hero-actions/hero-actions';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-hero',
  imports: [HeroStats, HeroActions],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  readonly heroService = inject(HeroService);
}

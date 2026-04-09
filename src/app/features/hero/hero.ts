import { Component, computed, signal } from '@angular/core';
import { HeroModel } from './hero.model';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  hero = signal<HeroModel >({
    name: 'Hero',
    level: 1,
    hp: 100,
    maxHp: 100,
    xp: 0
  });
  
  isAlive = computed(() => this.hero().hp > 0);
}

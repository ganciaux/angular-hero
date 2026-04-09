import { Component, signal } from '@angular/core';
import { HeroModel } from './hero.model';
import { HeroStats } from './hero-stats/hero-stats';
import { HeroActions } from './hero-actions/hero-actions';

@Component({
  selector: 'app-hero',
  imports: [HeroStats, HeroActions],
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

  actionLogs = signal<string[]>([]);

  updateHP (hp: number) {
    const newHp = hp > 0 ? Math.min(this.hero().maxHp, this.hero().hp + hp) : Math.max(0, this.hero().hp + hp);
    this.hero.update(hero => ({...hero, hp:newHp}));
  }

  updateLogs (log: string) {
    this.actionLogs.update(logs => [...logs, log]);
  }

  onGainXP() {
    this.hero.update(hero => ({...hero, xp: hero.xp + 10}));
    this.updateLogs('Hero gained 10 XP!');
  }

  onTakeDamage  (){
    this.updateHP(-10);
    this.updateLogs('Hero took -10 damage!');
  }

  onHeal(){
    const maxHp = this.hero().maxHp;
    this.updateHP(maxHp);
    this.updateLogs(`Hero healed for ${maxHp} HP!`);
  }
}

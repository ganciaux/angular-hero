import { Injectable, signal } from '@angular/core';
import { HeroModel } from './hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
   private _hero = signal<HeroModel >({
    name: 'Hero',
    level: 1,
    hp: 100,
    maxHp: 100,
    xp: 0,
    xpNextLevel: 100
  });

  private _actionLogs = signal<string[]>([]);

  readonly hero = this._hero.asReadonly();
  readonly actionLogs = this._actionLogs.asReadonly();

  updateHP (hp: number) {
    const newHp = hp > 0 ? Math.min(this.hero().maxHp, this.hero().hp + hp) : Math.max(0, this.hero().hp + hp);
    this._hero.update(hero => ({...hero, hp:newHp}));
  }

  updateLogs (log: string) {
    this._actionLogs.update(logs => [...logs, log]);
  }

  onGainXP() {
    this._hero.update(hero => {
      const newXp = hero.xp + 10;
      const levelUp = newXp >= hero.xpNextLevel;
      return {
        ...hero,
        xp: newXp,
        level: levelUp ? hero.level + 1 : hero.level,
        xpNextLevel: levelUp ? Math.floor(hero.xpNextLevel * (1.5+ hero.level/10)) : hero.xpNextLevel,
      };
    });
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
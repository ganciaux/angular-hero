import { inject, Injectable, signal } from '@angular/core';
import { CombatState } from './combat-state.enum';
import { CombatSessionModel } from './combat-session.model';
import { EnemyModel } from './enemy.model';
import { HeroService } from '../hero/hero.service';

@Injectable({
  providedIn: 'root',
})
export class CombatService {
  private readonly heroService = inject(HeroService);
  private _state=signal<CombatState>(CombatState.Idle);
  private _session=signal<CombatSessionModel|null>(null);
  readonly state=this._state.asReadonly();
  readonly session=this._session.asReadonly();

  startCombat(enemy: EnemyModel){
    this._session.set({hero: this.heroService.hero(), enemy, turn: 1, logs:[]})
    this._state.set(CombatState.Fighting);
  }

  reset(){
    this._session.set(null);
    this._state.set(CombatState.Idle);
  }
}

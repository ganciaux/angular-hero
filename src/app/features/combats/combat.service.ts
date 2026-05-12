import { inject, Injectable, signal } from '@angular/core';
import { CombatState } from './combat-state.enum';
import { CombatSessionModel } from './combat-session.model';
import { EnemyModel } from './enemy.model';
import { HeroService } from '../hero/hero.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CombatService {
  private readonly heroService = inject(HeroService);
  private _state=signal<CombatState>(CombatState.Idle);
  private _session=signal<CombatSessionModel|null>(null);
  readonly state=this._state.asReadonly();
  readonly session=this._session.asReadonly();

  private _logs$ = new BehaviorSubject<string[]>([]);
  readonly logs$ = this._logs$.asObservable();

  startCombat(enemy: EnemyModel){
    this._session.set({hero: this.heroService.hero(), enemy, turn: 1})
    this._state.set(CombatState.Fighting);
  }

  reset(){
    this._session.set(null);
    this._state.set(CombatState.Idle);
  }

  addLog(message: string){
    this._logs$.next([...this._logs$.value, message]);
  }
}

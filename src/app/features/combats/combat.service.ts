import { inject, Injectable, signal } from '@angular/core';
import { CombatState } from './combat-state.enum';
import { CombatSessionModel } from './combat-session.model';
import { EnemyModel } from './enemy.model';
import { HeroService } from '../hero/hero.service';
import { BehaviorSubject } from 'rxjs';
import { httpResource } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

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
  readonly logs = toSignal(this._logs$, { initialValue: [] as string[] });

  readonly enemiesResource = httpResource<EnemyModel[]>(()=>'http://localhost:3000/enemies');

  startCombat(enemy: EnemyModel){
    this._logs$.next([]);
    this._session.set({hero: this.heroService.hero(), enemy, turn: 1})
    this._state.set(CombatState.Fighting);
  }

  reset(){
    this._logs$.next([]);
    this._session.set(null);
    this._state.set(CombatState.Idle);
  }

  addLog(message: string){
    this._logs$.next([...this._logs$.value, message]);
  }

  heroAttacks(){
    const session = this._session();
    if (!session) return;

    const damage = Math.max(1, session.hero.attack - session.enemy.defense);
    const hp = Math.max(0, session.enemy.hp-damage)
    this._session.update(()=>({...session, enemy: {...session.enemy, hp} }))

    this.addLog(`Héros attaque ${session.enemy.name} pour [${damage}] dégâts`);

    if (hp==0){
      this.onVictory()
    }
      
    else{
      this.enemyAttacks()
    }
  }

  private enemyAttacks(){
    const session = this._session();
    if (!session) return;

    const damage = Math.max(1, session.enemy.attack - session.hero.defense);
    const hp = Math.max(0, session.hero.hp-damage)
    this._session.update(()=>({...session, turn: session.turn+1, hero: {...session.hero, hp} }))

    this.addLog(`[${session.enemy.name}] riposte pour [${damage}] dégâts`);

    if (hp==0){
      this.onDefeat()
    }
  }

  private onVictory(){
    this.addLog("Victoire !")
    this._state.set(CombatState.Victory)

  }

  private onDefeat(){
    this.addLog("Défaite...")
    this._state.set(CombatState.Defeat)
  }
}

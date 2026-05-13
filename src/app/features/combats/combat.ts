import { Component, inject } from '@angular/core';
import { CombatService } from './combat.service';
import { CombatState } from './combat-state.enum';

@Component({
  selector: 'app-combat',
  imports: [],
  templateUrl: './combat.html',
  styleUrl: './combat.scss',
})
export class Combat {
  protected combatService = inject(CombatService)
  protected readonly CombatState = CombatState;
}

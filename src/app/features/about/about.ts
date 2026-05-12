import { Component, inject } from '@angular/core';
import { CombatService } from '../combats/combat.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly combatService = inject(CombatService)
  constructor(){
    this.combatService.logs$.subscribe(logs => console.log('[Combat logs]', logs));
  }
}

import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { HeroStats } from './hero-stats/hero-stats';
import { HeroActions } from './hero-actions/hero-actions';
import { HeroService } from './hero.service';
import { Panel } from '../../shared/components/panel/panel';
import { Modal } from '../../shared/components/modal/modal';

@Component({
  selector: 'app-hero',
  imports: [HeroStats, HeroActions, Panel, Modal],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit, AfterViewInit {
  protected readonly heroService = inject(HeroService);
  protected showStats = false;

@ViewChild("heroDiv", { static: true }) heroDiv!: ElementRef; // static: true + élément TOUJOURS présent → dispo dans ngOnInit ✅
@ViewChild("statBar", { static: false }) statBar!: HeroStats; // static: false + élément TOUJOURS présent → undefined dans ngOnInit ❌
@ViewChild("statBarIf", { static: true }) statBarIf!: HeroStats; // static: true + élément dans @if → undefined partout ❌
@ViewChild("statBarElse", { static: false }) statBarElse!: HeroStats; // composant, static:false, dans @if

ngOnInit() {
  console.log('Hero ngOnInit called');
  console.log('heroDiv (static:true):', this.heroDiv);      // ✅ disponible
  console.log('statBar (static:false):', this.statBar);     // undefined
  console.log('statBarIf (static:true, @if):', this.statBarIf); // undefined
  console.log('statBarElse (static:false, @if):', this.statBarElse);
}

ngAfterViewInit() {
  console.log('Hero ngAfterViewInit called');
  console.log('heroDiv:', this.heroDiv);      // ✅
  console.log('statBar:', this.statBar);      // ✅
  console.log('statBarIf:', this.statBarIf);  // undefined (cause @if)
  console.log('statBarElse:', this.statBarElse);
}

  log(value: string) {
    console.log(value);
  }
}

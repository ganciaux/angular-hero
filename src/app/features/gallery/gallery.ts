import { Component, inject, signal, ViewChild } from '@angular/core';
import { LegendsService } from './legends.service';
import { Modal } from '../../shared/components/modal/modal';
import { LegendCard } from "./legend-card/legend-card";
import { LegendModel } from './legend.model';

@Component({
  selector: 'app-gallery',
  imports: [Modal, LegendCard],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  protected readonly legendsService = inject(LegendsService);
  selectedLegend = signal<LegendModel | null>(null);

  @ViewChild(Modal) modal!: Modal;
}

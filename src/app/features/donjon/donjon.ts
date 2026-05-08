import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DonjonService } from './donjon.service';

@Component({
  selector: 'app-donjon',
  imports: [RouterOutlet],
  templateUrl: './donjon.html',
  styleUrl: './donjon.scss',
})
export class Donjon {
  donjonService = inject(DonjonService)
}

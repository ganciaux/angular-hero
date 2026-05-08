import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DonjonService } from '../donjon.service';

@Component({
  selector: 'app-donjon-list',
  imports: [RouterLink],
  templateUrl: './donjon-list.html',
  styleUrl: './donjon-list.scss',
})
export class DonjonList {
  donjonService = inject(DonjonService)
  constructor(){
    this.donjonService.loadDonjons();
  }
}

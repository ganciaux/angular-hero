import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-inventory',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class Inventory {

}

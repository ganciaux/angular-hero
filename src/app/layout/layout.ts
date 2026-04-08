import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./nav/nav";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Nav],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}

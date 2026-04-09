import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-bar',
  imports: [],
  templateUrl: './stat-bar.html',
  styleUrl: './stat-bar.scss',
})
export class StatBar {
  label = input.required<string>();
  value = input.required<number>();
  max = input.required<number>();
}

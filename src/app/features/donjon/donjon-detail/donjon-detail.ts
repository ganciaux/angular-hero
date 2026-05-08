import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DonjonModel } from '../donjon.model';

@Component({
  selector: 'app-donjon-detail',
  imports: [RouterLink],
  templateUrl: './donjon-detail.html',
  styleUrl: './donjon-detail.scss',
})
export class DonjonDetail {
  private route = inject(ActivatedRoute);
  protected donjon = this.route.snapshot.data['donjon'] as DonjonModel | undefined;
}

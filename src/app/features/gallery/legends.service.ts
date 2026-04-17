import { Injectable, signal } from '@angular/core';
import { LEGENDS } from './legends.data';

@Injectable({
  providedIn: 'root',
})
export class LegendsService {
  private _legends = signal(LEGENDS);
  readonly legends = this._legends.asReadonly();
}

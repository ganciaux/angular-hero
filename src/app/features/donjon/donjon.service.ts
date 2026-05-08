import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DonjonModel } from './donjon.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonjonService {
  private httpClient = inject(HttpClient);
  private _donjons = signal< DonjonModel[]>([]);
  private _error = signal<string>('');
  readonly donjons = this._donjons.asReadonly();
  readonly error = this._error.asReadonly()

  loadDonjons() {
    return this.httpClient.get<DonjonModel[]>('http://localhost:3000/donjons').subscribe({
      next: (donjons) => {
        this._donjons.set(donjons);
      },
      error: (err) => {
        this._donjons.set([]);
        this._error.set('Failed to load donjons')
        console.log('Failed to load donjons:', err );
      }
    });
  }

  setError(error: string){
    this._error.set(error)
  }
  
  getById(id: string):Observable<DonjonModel> {
    return this.httpClient.get<DonjonModel>(`http://localhost:3000/donjons/${id}`);
  }
}

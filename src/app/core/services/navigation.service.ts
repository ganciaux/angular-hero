import { Injectable, signal } from '@angular/core';
import { NavigationLog } from './navigation.model';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _logs = signal<NavigationLog[]>([]);
  logs = this._logs.asReadonly();

  addLog(message: string, route: string) {
    this._logs.update((logs) => [...logs, { message, route }]);
  }

  resetLogs() {
    this._logs.set([]);
  }
}

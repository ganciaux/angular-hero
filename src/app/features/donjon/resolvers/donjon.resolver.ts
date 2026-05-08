import { ResolveFn } from '@angular/router';
import { DonjonModel } from '../donjon.model';
import { DonjonService } from '../donjon.service';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';

export const donjonResolver: ResolveFn<DonjonModel | undefined> = (route
) => {
  const donjonService = inject(DonjonService);
  const id = route.paramMap.get('id');
  if (!id) {
    return undefined;
  }
  return donjonService.getById(id).pipe(catchError(() => { return of(undefined); }));
};
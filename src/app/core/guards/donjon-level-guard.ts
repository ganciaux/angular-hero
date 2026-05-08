import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DonjonService } from '../../features/donjon/donjon.service';
import { HeroService } from '../../features/hero/hero.service';
import { catchError, map, of } from 'rxjs';

export const donjonLevelGuard: CanActivateFn = (route) => {
  const heroService = inject(HeroService);
  const donjonService = inject(DonjonService);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  donjonService.setError('');

  if (!id)
    return false;

  return donjonService.getById(id).pipe(
    map(donjon => {
      if (!donjon) {
        donjonService.setError(`Can't get donjon id=${id}`)
        return router.createUrlTree(['/donjons']);
      }
      if(heroService.hero().level >= donjon.minLevel) {
        return true;
      }
      donjonService.setError(`Hero level is too lower... can't get acces to ${donjon.name} `)
      return router.createUrlTree(['/donjons']);
    }),
    catchError((err) => { donjonService.setError('Something went wrong'); console.log(err); return of(false); })
  );
};

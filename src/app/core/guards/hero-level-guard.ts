import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HeroService } from '../../features/hero/hero.service';
import { NavigationService } from '../services/navigation.service';

export const heroLevelGuard: CanActivateFn = (route) => {
  const heroService = inject(HeroService);
  const router = inject(Router);
  const navigationService = inject(NavigationService);

  if (heroService.hero().level < 5) {
    navigationService.addLog('You need to be at least level 5 to access this area!', route.url.join('/'));
    return router.createUrlTree(['/']);
  }
  navigationService.resetLogs();
  return true;
};

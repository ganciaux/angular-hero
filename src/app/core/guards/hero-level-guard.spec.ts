import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { heroLevelGuard } from './hero-level-guard';

describe('heroLevelGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => heroLevelGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

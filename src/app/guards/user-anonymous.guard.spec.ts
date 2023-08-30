import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userAnonymousGuard } from './user-anonymous.guard';

describe('userAnonymousGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userAnonymousGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

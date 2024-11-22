import { CanActivateFn } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
  });

  it('should allow access if the user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(true);
    expect(authGuard.canActivate()).toBeTrue();
  });

  it('should redirect to login if the user is not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);
    authGuard.canActivate();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});

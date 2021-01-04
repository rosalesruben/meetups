import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let allowedRoles = next.data.allowedRoles;
    if (
      this.authService.isLogged &&
      this.authService.isAuthorized(allowedRoles)
    ) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  constructor(private router: Router, private authService: AuthService) {}
}

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if(currentUser){
      if (currentUser?.role == 'ADMIN_ROLE' || currentUser?.role == 'SUPER_ADMIN_ROLE') {
        // logged in so return true
        return true;
      }
      // not logged in so redirect to login page with the return url
      this.router.navigateByUrl('/error/403');
    }
    return false;
  }
}

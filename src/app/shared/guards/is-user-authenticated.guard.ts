import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsUserAuthenticatedGuard implements CanActivate {
  constructor(public userService: UserService,
              public router: Router) {}

    /**
     * activates private routes if user is authenticated
     */
    canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      const isAuthenticated = this.userService.isAuthenticated();

      if (isAuthenticated) {
        this.router.navigate(['/account']);
        return false;
      }

      return true;
    }
}

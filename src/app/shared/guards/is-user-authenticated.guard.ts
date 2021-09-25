import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsUserAuthenticatedGuard implements CanActivate {
  constructor(public authService: AuthService,
              public router: Router) {}

    /**
     * activates private routes if user is authenticated
     */
    async canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Promise<boolean> {

      const isAuthenticated = await this.authService.isAuthenticated();

      if (isAuthenticated) {
        this.router.navigate(['/account']);
        return false;
      }

      return true;
    }
}

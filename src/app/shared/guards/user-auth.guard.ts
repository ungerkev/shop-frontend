import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(public authService: AuthService,
              public router: Router) {}

    /**
     * activates private routes if user is authenticated
     */
    async canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Promise<boolean> {

      const isAuthenticated = await this.authService.isAuthenticated();

      if (!isAuthenticated) {
        this.router.navigate(['/account/login']);
        return false;
      }

      return true;
    }


}

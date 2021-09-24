import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(public userService: UserService,
              public router: Router) {}

    /**
     * activates private routes if user is authenticated
     */
   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      const isAuthenticated = this.userService.isAuthenticated();

      if (!isAuthenticated) {
        this.router.navigate(['/account/login']);
        return false;
      }

      return true;
  }


}

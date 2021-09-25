import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private toastrService: ToastrService,
              private userService: UserService,
              private router: Router) { }

  /**
   * Login a user
   * @param email string
   * @param password string
   * @param rememberMe boolean
   * @returns promise
   */
  public login(email: string, password: string, rememberMe: boolean): Promise<any> {
    return this.http.post('http://localhost:3000/login', { email, password, rememberMe }, { withCredentials: true }).toPromise();
  }

  /**
   * Logout a user
   */
  public async logout(): Promise<void> {
    const userId = await this.userService.getUserId();
    console.log(userId);

    this.http.get('http://localhost:3000/logout/' + userId, { withCredentials: true }).toPromise().then(() => {
      this.router.navigate(['/']);
    }).catch((err) => {
      console.log(err);
    });
  }

  public isAuthenticated(): Promise<any> {
    return this.http.get('http://localhost:3000/isAuthenticated',{ withCredentials: true }).toPromise();
  }
}

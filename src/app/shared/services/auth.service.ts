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

  /*
  { withCredentials: true } -------> to send the auth cookie
   */

  /**
   * Do refresh the access token
   * @param refreshToken string
   * @returns Promise
   */
  public refreshToken(refreshToken: string): Promise<any> {
    return this.http.post('http://localhost:3000/refreshToken', { refreshToken }).toPromise();
  }

  /**
   * Logout a user
   */
  public logout(): void {
    const user: any = this.userService.getUserFromLocalStorage();
    this.http.post('http://localhost:3000/logout', { email: user?.email }, { withCredentials: true }).toPromise().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.router.navigate(['/']);
    }).catch((err) => {
      console.log(err);
    });
  }

  public isAuthenticated(): Promise<any> {
    return this.http.get('http://localhost:3000/isAuthenticated',{ withCredentials: true }).toPromise();
  }
}

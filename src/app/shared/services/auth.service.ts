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
   * @returns promise
   */
  public login(email: string, password: string): Promise<any> {
    return this.http.post('http://localhost:3000/login', { email, password }, { withCredentials: true }).toPromise();
  }

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
    this.http.post('http://localhost:3000/logout', { email: user?.email }).toPromise().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.router.navigate(['/']);
    }).catch((err) => {
      this.toastrService.error('Logout failed', 'Error');
      throw new Error('Logout failed');
    });
  }
}

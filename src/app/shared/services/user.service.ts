import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * Returns the userId from the payload of the JWT token
   * @returns Promise
   */
  public getUserId(): Promise<any> {
    return this.http.get('http://localhost:3000/userId', { withCredentials: true }).toPromise();
  }

  /**
   * Check whether a user is admin or not
   * @returns Promise
   */
  public isAdmin(): Promise<any> {
    return this.http.post('http://localhost:3000/isAdmin', '').toPromise();
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddress } from '../interfaces/IAddress';
import { getIUser, IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * Save an address for an particular user
   * @param address IAddress
   * @param userId number
   * @returns Promise
   */
  public saveAddress(address: IAddress, userId: number): Promise<any> {
    address.userId = userId;
    return this.http.post('http://localhost:3000/saveAddress', { address }).toPromise();
  }

  /**
   * Returns an array of all addresses of an user id
   * @param userId number
   * @returns Promise
   */
  public getAllAddressesOfUserId(userId: number): Promise<any> {
    return this.http.get('http://localhost:3000/addresses/' + userId).toPromise();
  }

  /**
   * Returns the userId from the payload of the JWT token
   * @returns Promise
   */
  public getUserIdOfToken(): Promise<any> {
    return this.http.get('http://localhost:3000/userId').toPromise();
  }

  /**
   * Check if user is authenticated
   * @returns boolean
   */
   public isAuthenticated(): boolean {
    const user = this.getUserFromLocalStorage();
    if (!user) {
      return false;
    }

    return true;
  }

  /**
   * Check whether a user is admin or not
   * @returns Promise
   */
  public isAdmin(): Promise<any> {
    return this.http.post('http://localhost:3000/isAdmin', '').toPromise();
  }

  /**
   * Get user from local storage
   * @returns any
   */
   getUserFromLocalStorage(): any { // TODO: refactor types
    let user: any;
    if (localStorage.getItem('user') !== null) {
      user = JSON.parse(localStorage.getItem('user') || '');
      return user;
    }
    return null;
  }
}

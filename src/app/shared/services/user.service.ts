import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAddress } from '../interfaces/IAddress';

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

  public deleteAddress(id: number): Promise<any> {
    return this.http.delete('http://localhost:3000/deleteAddress/' + id).toPromise();
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

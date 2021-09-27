import { Injectable } from '@angular/core';
import { IAddress } from "../interfaces/IAddress";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

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
   * Delete an address by its id
   * @param id number
   */
  public deleteAddress(id: number): Promise<any> {
    return this.http.delete('http://localhost:3000/deleteAddress/' + id).toPromise();
  }

  /**
   * edit / update an address
   * @param id number
   * @param userId number
   * @param address IAddress
   */
  public editAddress(id: number, userId: number, address: IAddress): Promise<any> {
    address.userId = userId;
    return this.http.patch('http://localhost:3000/updateAddress/' + id, { address }).toPromise();
  }

  /**
   * Get an address by its id
   * @param id number
   */
  public getAddress(id: number) {
    return this.http.get('http://localhost:3000/address/' + id).toPromise();
  }

  /**
   * Returns an array of all addresses of an user id
   * @param userId number
   * @returns Promise
   */
  public getAllAddressesOfUserId(userId: number): Promise<any> {
    return this.http.get('http://localhost:3000/addresses/' + userId).toPromise();
  }
}

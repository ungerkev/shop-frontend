import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * Get all products
   */
  public getProducts(): Promise<any> {
    return this.http.get('http://localhost:3001/products').toPromise();
  }
}

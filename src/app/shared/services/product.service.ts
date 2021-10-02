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
  public getProducts(page: string = '1', limit: string = '50'): Promise<any> {
    return this.http.get('http://localhost:3001/products', {
      params: {
        page: page,
        limit: limit
      }
    }).toPromise();
  }
}

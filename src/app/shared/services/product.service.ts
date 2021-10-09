import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProduct} from "../interfaces/IProduct";

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

  /**
   * Save new product WITH IMAGE
   * @param product IProduct
   * @param image File
   */
  public saveNewProduct(product: IProduct, image: File): Promise<any> {
    const formData = new FormData();
    formData.append('image', image, image.name);
    formData.append('product', JSON.stringify(product));
    return this.http.post('http://localhost:3001/product', formData ).toPromise();
  }

  /**
   * Delete product WITH IMAGE
   * @param id number
   */
  public deleteProduct(id: number): Promise<any> {
    return this.http.delete('http://localhost:3001/product/' + id).toPromise();
  }
}

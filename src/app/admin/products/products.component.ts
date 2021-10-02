import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../shared/services/product.service";
import {IProduct} from "../../shared/interfaces/IProduct";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: { rows: IProduct[], count: number} = { rows: [], count: 0 };

  /** Pagination variables **/
  limit: string = '50';
  page: string = '1';
  totalPageCount: number = 0;

  constructor(private productService: ProductService) { }

  async ngOnInit(): Promise<void> {
    await this.getProducts();
    console.log(this.products.rows);
  }

  /**
   * Get products array and count all
   */
  async getProducts(): Promise<void> {
    this.products = await this.productService.getProducts(this.page, this.limit);
    /** Calculate the total page count for pagination **/
    this.totalPageCount = Math.ceil(this.products.count / parseInt(this.limit, 10));
  }


  /********************
   **** Pagination ****
   ********************/

  /**
   * Go to next available page
   */
  async nextPage(): Promise<void> {
    if (parseInt(this.page, 10) >= 1 && this.products.rows.length === parseInt(this.limit, 10)) {
      this.products = { rows: [], count: 0 };
      this.page = (parseInt(this.page, 10) + 1).toString();
      await this.getProducts();
    }
  }

  /**
   * Go to previous available page
   */
  async previousPage(): Promise<void> {
    if (parseInt(this.page, 10) > 1) {
      this.products = { rows: [], count: 0 };
      this.page = (parseInt(this.page, 10) - 1).toString();
      await this.getProducts();
    }
  }

  /**
   * Disable next button if no next page is available
   */
  disableNext(): boolean {
    return this.products.rows.length < parseInt(this.limit, 10);
  }

  /**
   * Disable previous button if no previous page is available
   */
  disablePrevious(): boolean {
    return parseInt(this.page, 10) <= 1;
  }

}

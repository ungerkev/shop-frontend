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

  constructor(private productService: ProductService) { }

  async ngOnInit(): Promise<void> {
    this.products = await this.productService.getProducts();
  }

}

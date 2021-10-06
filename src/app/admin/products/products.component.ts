import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../shared/services/product.service";
import { IProduct } from "../../shared/interfaces/IProduct";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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

  /** Add new product MODAL variables **/
  showAddNewProductModal: boolean = false;
  newProductForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    oldPrice: new FormControl(''),
    tags: new FormControl('', [Validators.required]),
    articleNr: new FormControl('', [Validators.required]),
  });

  constructor(private productService: ProductService) { }

  async ngOnInit(): Promise<void> {
    await this.getProducts();
  }

  /**
   * Get products array and count all
   */
  async getProducts(): Promise<void> {
    this.products = await this.productService.getProducts(this.page, this.limit);
    /** Calculate the total page count for pagination **/
    this.totalPageCount = Math.ceil(this.products.count / parseInt(this.limit, 10));
  }

  /**
   * Save new product
   */
  async saveNewProduct(): Promise<void> {
    if (this.newProductForm.valid) {
      try {
        await this.productService.saveNewProduct(this.newProductForm.value);
        await this.productService.getProducts(this.page, this.limit);
        this.showAddNewProductModal = false;
      } catch (error: any) {
        console.log('Product could not be saved');
      }

    }
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
   * On change limit the page is set to 1 and getProducts is called
   */
  async onChangeLimit(): Promise<void> {
    this.page = '1';
    await this.getProducts();
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

  /********************************************
   **** New product modal input validators ****
   *******************************************/

  /**
   * Validate required product name
   * @returns boolean
   */
  validateProductNameRequired(): boolean {
    return !!(this.newProductForm.get('name')?.touched
      && this.newProductForm.get('name')?.errors?.required);
  }

  /**
   * Validate required description
   * @returns boolean
   */
  validateDescriptionRequired(): boolean {
    return !!(this.newProductForm.get('description')?.touched
      && this.newProductForm.get('description')?.errors?.required);
  }

  /**
   * Validate required price
   * @returns boolean
   */
  validatePriceRequired(): boolean {
    return !!(this.newProductForm.get('price')?.touched
      && this.newProductForm.get('price')?.errors?.required);
  }

  /**
   * Validate required tags
   * @returns boolean
   */
  validateTagsRequired(): boolean {
    return !!(this.newProductForm.get('tags')?.touched
      && this.newProductForm.get('tags')?.errors?.required);
  }

  /**
   * Validate required articleNr
   * @returns boolean
   */
  validateArticleNrRequired(): boolean {
    return !!(this.newProductForm.get('articleNr')?.touched
      && this.newProductForm.get('articleNr')?.errors?.required);
  }


}

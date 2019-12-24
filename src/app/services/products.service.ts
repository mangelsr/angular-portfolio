import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  private loadProducts() {
    return new Promise((resolve, reject) => {
      this.http.get('https://angular-html-7d172.firebaseio.com/products_idx.json')
        .subscribe(((resp: Product[]) => {
          this.products = resp;
          this.loading = false;
          resolve();
        }));
    });
  }

  getProduct(id: string) {
    return this.http.get(`https://angular-html-7d172.firebaseio.com/products/${id}.json`);
  }

  searchProduct(term: string) {
    if (this.products.length === 0) {
      this.loadProducts().then(() => {
        this.filterProduct(term);
      });
    } else {
      this.filterProduct(term);
    }
  }

  private filterProduct(term: string) {
    term = term.toLowerCase().trim();
    this.filteredProducts = this.products.filter(
      (product: Product) => {
        const catIndex = product.category.toLowerCase().indexOf(term);
        const titleIndex = product.title.toLowerCase().indexOf(term);
        return catIndex >= 0 || titleIndex >= 0;
      });
  }
}

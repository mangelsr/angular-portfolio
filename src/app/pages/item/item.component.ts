import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/interfaces/product-model.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  product: ProductModel;
  productId: string;

  constructor(
    private route: ActivatedRoute,
    public productService: ProductsService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.productService.getProduct(params.id).subscribe((resp: ProductModel) => {
        this.productId = params.id;
        this.product = resp;
      });
    });
  }

}

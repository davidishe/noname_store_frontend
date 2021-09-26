import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/products/product';
import { ShopService } from 'src/app/services/products/shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from '../../basket/basket.service';
import { IBasketItem } from 'src/app/shared/models/basket';
import { BusyService } from 'src/app/services/infrastructure/busy.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  productId: number;
  guId: number;
  quantity: number;


  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private basketService: BasketService,
    // private busyService: BusyService
  ) {
      this.breadcrumbService.set('@productDetails', '');
      this.quantity = 1;
  }

  ngOnInit() {
    this.guId = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.guId);
    this.loadProductByGuId();
  }

  loadProductByGuId() {
      this.shopService.getProductByGuId(this.guId).subscribe((response: IProduct) => {
      this.product = response;
      console.log(this.product);

      if (this.basketService.isProductInBasket(this.product.guId)) {
        this.product.isSelected = true;
      }

      this.breadcrumbService.set('@productDetails', this.product.name);
    }, err => {
      console.log(err);
    });
  }

  addItemToBasket(product: any) {
    console.log(product);
    this.basketService.addItemToBasket(product, this.quantity);
  }

  removeItemFromBasket(item: IProduct) {
    this.basketService.removeItemFromBasket(item);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

}

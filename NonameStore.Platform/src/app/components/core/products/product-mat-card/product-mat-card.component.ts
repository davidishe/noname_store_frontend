import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/components/content/basket/basket.service';
import { IProduct } from 'src/app/shared/models/products/product';

@Component({
  selector: 'app-product-mat-card',
  templateUrl: './product-mat-card.component.html',
  styleUrls: ['./product-mat-card.component.scss']
})
export class ProductMatCardComponent implements OnInit {

  @Input() product: IProduct;

  constructor(
    private basketService: BasketService
  ) { }

  ngOnInit(): void {
  }

  addItemToBasket(product: IProduct): void {
    this.basketService.addItemToBasket(product, 1);
    product.isSelected = true;
  }

  removeItemFromBasket(product: IProduct): void {
    this.basketService.removeItemFromBasket(product);
    product.isSelected = false;
  }

}

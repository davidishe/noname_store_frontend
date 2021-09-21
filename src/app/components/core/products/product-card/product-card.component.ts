import { Component, OnInit, Input } from '@angular/core';
import { IBasketItem } from 'src/app/shared/models/basket';
import { IProduct } from 'src/app/shared/models/products/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() basketItems: IProduct[];


  constructor() { }

  ngOnInit() {
  }

}

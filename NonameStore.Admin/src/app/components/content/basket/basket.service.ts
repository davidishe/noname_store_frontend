import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/shared/models/products/product';
import { IDeliveryMethod } from 'src/app/shared/models/orders/deliveryMethod';
import { IBasketTotals, IBasket, IBasketItem, Basket } from 'src/app/shared/models/basket';
import { Router } from '@angular/router';
import { BusyService } from 'src/app/services/infrastructure/busy.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  shiping = null;
  deliveryMethodId: number;

  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  public basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(
    private http: HttpClient,
    private busyService: BusyService
    ) { }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
          this.shiping = basket.shippingPrice;
          this.deliveryMethodId = basket.deliveryMethodId;
          this.calculateTotals();
        })
      );
  }

  isProductInBasket(productId: number): boolean {
    const basket = this.getCurrentBasketValue();

    if (basket) {
      for (const p of basket.items) {
        if (p.id === productId) {
          return true;
        }
      }
    }

    return false;
  }

  setShipingPrice(deliveryMethod: IDeliveryMethod) {
    this.shiping = deliveryMethod.price;
    this.calculateTotals();
    const basket = this.getCurrentBasketValue();
    basket.shippingPrice = deliveryMethod.price;
    basket.deliveryMethodId = deliveryMethod.id;
    this.deliveryMethodId = deliveryMethod.id;
    this.setBasket(basket);
  }

  setBasket(basket: IBasket) {
    basket.deliveryMethodId = this.deliveryMethodId;
    return this.http.post(this.baseUrl + 'basket', basket).subscribe((response: IBasket) => {
      this.basketSource.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity: number) {
    console.log(quantity);
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    let basket = this.getCurrentBasketValue();
    if (basket === null) {
      basket = this.createBasket();
    }
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    if (basket.items[foundItemIndex].quantity > 0) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    }
    if (basket.items[foundItemIndex].quantity === 0) {
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IProduct) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x => x.id === item.id)) {
      basket.items = basket.items.filter(z => z.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
      this.busyService.setLoadingStatus(false);
    }
  }

  deleteLocalBasket(id: string) {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('app-basket-id');
  }

  deleteBasket(basket: IBasket): any {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() => {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      this.shiping = 0;
      this.deliveryMethodId = null;
      localStorage.removeItem('app-basket-id');
    }, error => {
      console.log(error);
    });
  }

  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      pictureUrl: item.pictureUrl,
      type: item.type,
      region: item.region,
      description: item.description,
      guId: item.guId
    };
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    console.log(items);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shiping = this.shiping;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = shiping + subtotal;
    this.basketTotalSource.next({shiping, subtotal, total});
  }

  createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('app-basket-id', basket.id);
    return basket;
  }

  createPaymentIntent() {
    return this.http.post(this.baseUrl + 'payments/invoice/?basketId=' + this.getCurrentBasketValue().id, {} ).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
      })
    );
  }
}

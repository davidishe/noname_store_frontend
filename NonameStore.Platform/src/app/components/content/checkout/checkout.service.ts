import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IDeliveryMethod } from 'src/app/shared/models/orders/deliveryMethod';
import { IOrderItem, IOrderToCreate } from 'src/app/shared/models/orders/order';
import { BasketService } from '../basket/basket.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private basketService: BasketService
  ) { }

  getDeliveryMethods() {
    return this.http.get(this.baseUrl + 'orders/deliverymethods/').pipe(
      map((dm: IDeliveryMethod[]) => {
        return dm.sort((a, b) => b.price - a.price);
      })
    );
  }

  createOrder(order: IOrderToCreate) {
    return this.http.post(this.baseUrl + 'orders', order);
  }
}

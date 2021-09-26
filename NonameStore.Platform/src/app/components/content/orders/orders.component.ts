import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/models/orders/order';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  order: IOrder;
  orders: IOrder[];
  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.ordersService.getAllOrders().subscribe((orders: IOrder[]) => {
      console.log(orders);
      this.orders = orders;
    }, error => {
      console.log(error);
    });
  }

}

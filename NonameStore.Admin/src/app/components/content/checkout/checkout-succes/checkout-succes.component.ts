import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/models/orders/order';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout-succes',
  templateUrl: './checkout-succes.component.html',
  styleUrls: ['./checkout-succes.component.scss']
})
export class CheckoutSuccesComponent implements OnInit {
  order: IOrder;
  orderId: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.orderId);
  }

}

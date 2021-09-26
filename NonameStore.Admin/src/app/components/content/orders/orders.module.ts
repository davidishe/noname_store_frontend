import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { CoreModule } from '../../core/core.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    OrdersComponent

  ],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    OrdersRoutingModule,
    RouterModule
  ]
})
export class OrdersModule { }

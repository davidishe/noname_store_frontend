import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { CoreModule } from '../../core/core.module';
import { MaterialModule } from 'src/app/shared/material.module';



@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    CoreModule,
    MaterialModule
  ],
  // exports: [
  //   BasketComponent
  // ]
})
export class BasketModule { }

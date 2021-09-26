import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasketComponent } from './basket.component';
import { CoreModule } from '../../core/core.module';
import { MaterialModule } from 'src/app/shared/material.module';

const routes = [
  {path: '', component: BasketComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreModule,
    MaterialModule,
  ],
  exports: [
    RouterModule
  ]
})
export class BasketRoutingModule { }

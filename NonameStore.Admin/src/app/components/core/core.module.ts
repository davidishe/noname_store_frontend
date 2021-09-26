import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { PageHeaderComponent } from './page-header/page-header.component';
import { LayerComponent } from './layer/layer.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { OrderTotalComponent } from './order-total/order-total.component';
import { RouterModule } from '@angular/router';
import { StepperComponent } from './stepper/stepper.component';
import { DateAgoPipe } from 'src/app/pipes/time-ago.pipe';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { MatButtonComponent } from './mat-button/mat-button.component';
import { ProductMatCardComponent } from './products/product-mat-card/product-mat-card.component';
import { CarouselComponent } from 'ng-carousel-cdk';
import { MatCarouselComponent } from './mat-carousel/mat-carousel.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { DadataAddressComponent } from '../kit/dadata-address/dadata-address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const userComponents = [
  DadataAddressComponent
]

@NgModule({
  declarations: [
    BreadCrumbComponent,
    PageHeaderComponent,
    LayerComponent,
    OrderTotalComponent,
    StepperComponent,
    DateAgoPipe,
    ProductCardComponent,
    MatButtonComponent,
    ProductMatCardComponent,
    MatCarouselComponent,
    userComponents

  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    MaterialModule,
    RouterModule,
    Ng2CarouselamosModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    BreadCrumbComponent,
    PageHeaderComponent,
    OrderTotalComponent,
    StepperComponent,
    ProductCardComponent,
    userComponents,

    DateAgoPipe,

    BreadcrumbModule,
    LayerComponent,
    MatButtonComponent,
    ProductMatCardComponent,
    MatCarouselComponent
  ]
})
export class CoreModule { }

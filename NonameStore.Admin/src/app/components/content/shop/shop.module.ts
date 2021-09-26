import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopComponent } from './shop/shop.component';
import { ShopService } from 'src/app/services/products/shop.service';
import { TypesService } from 'src/app/services/products/types.service';
import { RegionsService } from 'src/app/services/products/regions.service';
import { ShopRoutingModule } from './shop-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { PagerHeaderComponent } from '../../core/pager-header/pager-header.component';
import { CoreModule } from '../../core/core.module';


@NgModule({
  declarations: [
    ShopComponent,
    ProductDetailsComponent,
    PagerHeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ShopRoutingModule,
    CoreModule,
  ],
  exports: [],
  providers: [
    ShopService,
    TypesService,
    RegionsService
  ],
})

export class ShopModule { }

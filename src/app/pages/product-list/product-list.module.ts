import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../shared/services/product.service';
import { PaginationModule } from '../../pagination/pagination.module';


@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    PaginationModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductListModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { PaginationModule } from '../../pagination/pagination.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    PaginationModule,
    SharedModule
  ],
  providers: []
})
export class ProductListModule {
}

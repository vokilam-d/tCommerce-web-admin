import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductReviewListRoutingModule } from './product-review-list-routing.module';
import { ProductReviewListComponent } from './product-review-list.component';
import { PaginationModule } from '../../pagination/pagination.module';


@NgModule({
  declarations: [ProductReviewListComponent],
  imports: [
    CommonModule,
    ProductReviewListRoutingModule,
    PaginationModule
  ]
})
export class ProductReviewListModule { }

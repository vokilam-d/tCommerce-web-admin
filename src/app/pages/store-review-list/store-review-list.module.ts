import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreReviewListRoutingModule } from './store-review-list-routing.module';
import { StoreReviewListComponent } from './store-review-list.component';
import { PaginationModule } from '../../pagination/pagination.module';


@NgModule({
  declarations: [StoreReviewListComponent],
  imports: [
    CommonModule,
    StoreReviewListRoutingModule,
    PaginationModule
  ]
})
export class StoreReviewListModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductReviewListRoutingModule } from './product-review-list-routing.module';
import { ProductReviewListComponent } from './product-review-list.component';
import { GridModule } from '../../grid/grid.module';


@NgModule({
  declarations: [ProductReviewListComponent],
  imports: [
    CommonModule,
    ProductReviewListRoutingModule,
    GridModule
  ]
})
export class ProductReviewListModule { }

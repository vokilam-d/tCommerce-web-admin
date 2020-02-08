import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductReviewRoutingModule } from './product-review-routing.module';
import { ProductReviewComponent } from './product-review.component';
import { MediaAssetModule } from '../../media-asset/media-asset.module';
import { MediaUploaderModule } from '../../media-uploader/media-uploader.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { OrderModule } from '../order/order.module';
import { ProductSelectorModule } from '../../product-selector/product-selector.module';


@NgModule({
  declarations: [ProductReviewComponent],
  imports: [
    CommonModule,
    ProductReviewRoutingModule,
    MediaAssetModule,
    MediaUploaderModule,
    ReactiveFormsModule,
    SharedModule,
    OrderModule,
    ProductSelectorModule
  ]
})
export class ProductReviewModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreReviewRoutingModule } from './store-review-routing.module';
import { StoreReviewComponent } from './store-review.component';
import { MediaAssetModule } from '../../media-asset/media-asset.module';
import { MediaUploaderModule } from '../../media-uploader/media-uploader.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RatingSelectorModule } from '../../rating-selector/rating-selector.module';


@NgModule({
  declarations: [StoreReviewComponent],
  imports: [
    CommonModule,
    StoreReviewRoutingModule,
    MediaAssetModule,
    MediaUploaderModule,
    ReactiveFormsModule,
    RatingSelectorModule
  ]
})
export class StoreReviewModule { }

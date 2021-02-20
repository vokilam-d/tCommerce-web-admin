import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductReviewListViewerComponent } from './product-review-list-viewer.component';
import { GridModule } from '../grid/grid.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProductReviewListViewerComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    SharedModule
  ],
  exports: [
    ProductReviewListViewerComponent
  ]
})
export class ProductReviewListViewerModule { }

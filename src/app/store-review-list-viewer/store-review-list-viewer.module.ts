import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreReviewListViewerComponent } from './store-review-list-viewer.component';
import { GridModule } from '../grid/grid.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    StoreReviewListViewerComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    SharedModule
  ],
  exports: [
    StoreReviewListViewerComponent
  ]
})
export class StoreReviewListViewerModule { }

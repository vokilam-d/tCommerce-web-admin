import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreReviewListRoutingModule } from './store-review-list-routing.module';
import { StoreReviewListComponent } from './store-review-list.component';
import { GridModule } from '../../grid/grid.module';


@NgModule({
  declarations: [StoreReviewListComponent],
  imports: [
    CommonModule,
    StoreReviewListRoutingModule,
    GridModule
  ]
})
export class StoreReviewListModule { }

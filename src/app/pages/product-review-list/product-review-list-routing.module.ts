import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductReviewListComponent } from './product-review-list.component';

const routes: Routes = [{ path: '', component: ProductReviewListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductReviewListRoutingModule { }

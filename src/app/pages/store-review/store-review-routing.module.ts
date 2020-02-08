import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreReviewComponent } from './store-review.component';

const routes: Routes = [{ path: '', component: StoreReviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreReviewRoutingModule { }

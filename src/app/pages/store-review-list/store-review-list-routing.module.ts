import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreReviewListComponent } from './store-review-list.component';

const routes: Routes = [{ path: '', component: StoreReviewListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreReviewListRoutingModule { }

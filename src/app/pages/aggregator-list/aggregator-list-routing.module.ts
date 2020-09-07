import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AggregatorListComponent } from './aggregator-list.component';

const routes: Routes = [{ path: '', component: AggregatorListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AggregatorListRoutingModule { }

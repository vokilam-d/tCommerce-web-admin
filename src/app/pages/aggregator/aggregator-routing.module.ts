import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AggregatorComponent } from './aggregator.component';

const routes: Routes = [{ path: '', component: AggregatorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AggregatorRoutingModule { }

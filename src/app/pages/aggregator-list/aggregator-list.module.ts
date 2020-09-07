import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AggregatorListRoutingModule } from './aggregator-list-routing.module';
import { AggregatorListComponent } from './aggregator-list.component';
import { SharedModule } from '../../shared/shared.module';
import { GridModule } from '../../grid/grid.module';


@NgModule({
  declarations: [AggregatorListComponent],
  imports: [
    CommonModule,
    AggregatorListRoutingModule,
    SharedModule,
    GridModule
  ]
})
export class AggregatorListModule { }

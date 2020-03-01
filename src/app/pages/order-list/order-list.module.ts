import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderListRoutingModule } from './order-list-routing.module';
import { OrderListComponent } from './order-list.component';
import { GridModule } from '../../grid/grid.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [OrderListComponent],
  imports: [
    CommonModule,
    OrderListRoutingModule,
    GridModule,
    SharedModule
  ]
})
export class OrderListModule { }

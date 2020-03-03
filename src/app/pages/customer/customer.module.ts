import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { OrderListViewerComponent } from './order-list-viewer/order-list-viewer.component';
import { GridModule } from '../../grid/grid.module';


@NgModule({
  declarations: [CustomerComponent, OrderListViewerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    GridModule,
    SharedModule
  ]
})
export class CustomerModule { }

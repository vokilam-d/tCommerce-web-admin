import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { OrderListRoutingModule } from './order-list-routing.module';
import { OrderListComponent } from './order-list.component';
import { GridModule } from '../../grid/grid.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReadableCurrencyPipe } from '../../shared/pipes/readable-currency.pipe';


@NgModule({
  declarations: [OrderListComponent],
  imports: [
    CommonModule,
    OrderListRoutingModule,
    GridModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    ReadableCurrencyPipe
  ]
})
export class OrderListModule { }

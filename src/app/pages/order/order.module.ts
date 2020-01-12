import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerSelectorComponent } from './customer-selector/customer-selector.component';
import { PaginationModule } from '../../pagination/pagination.module';
import { ProductSelectorComponent } from './product-selector/product-selector.component';


@NgModule({
  declarations: [OrderComponent, CustomerSelectorComponent, ProductSelectorComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    PaginationModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OrderModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerListRoutingModule } from './customer-list-routing.module';
import { CustomerListComponent } from './customer-list.component';
import { PaginationModule } from '../../pagination/pagination.module';


@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    PaginationModule,
    CustomerListRoutingModule
  ]
})
export class CustomerListModule { }

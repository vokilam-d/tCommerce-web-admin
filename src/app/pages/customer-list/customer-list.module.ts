import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerListRoutingModule } from './customer-list-routing.module';
import { CustomerListComponent } from './customer-list.component';
import { PaginationModule } from '../../pagination/pagination.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    PaginationModule,
    CustomerListRoutingModule,
    SharedModule
  ]
})
export class CustomerListModule { }

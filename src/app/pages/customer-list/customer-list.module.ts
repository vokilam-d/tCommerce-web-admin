import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerListRoutingModule } from './customer-list-routing.module';
import { CustomerListComponent } from './customer-list.component';
import { SharedModule } from '../../shared/shared.module';
import { GridModule } from '../../grid/grid.module';


@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule,
    CustomerListRoutingModule,
    SharedModule,
    GridModule
  ]
})
export class CustomerListModule { }

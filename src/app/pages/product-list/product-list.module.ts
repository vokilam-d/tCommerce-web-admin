import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { SharedModule } from '../../shared/shared.module';
import { GridModule } from '../../grid/grid.module';
import { ReadableCurrencyPipe } from '../../shared/pipes/readable-currency.pipe';


@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    SharedModule,
    GridModule
  ],
  providers: [
    ReadableCurrencyPipe,
    DatePipe
  ]
})
export class ProductListModule {
}

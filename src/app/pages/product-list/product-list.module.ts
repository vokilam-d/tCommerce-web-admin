import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { SharedModule } from '../../shared/shared.module';
import { GridModule } from '../../grid/grid.module';


@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    SharedModule,
    GridModule
  ],
  providers: []
})
export class ProductListModule {
}

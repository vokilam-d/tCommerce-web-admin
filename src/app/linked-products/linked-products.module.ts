import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkedProductsComponent } from './linked-products.component';
import { ProductItemSorterModule } from '../product-item-sorter/product-item-sorter.module';
import { SharedModule } from '../shared/shared.module';
import { ProductSelectorModule } from '../product-selector/product-selector.module';



@NgModule({
  declarations: [LinkedProductsComponent],
  exports: [
    LinkedProductsComponent
  ],
  imports: [
    CommonModule,
    ProductItemSorterModule,
    SharedModule,
    ProductSelectorModule
  ]
})
export class LinkedProductsModule { }

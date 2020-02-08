import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSelectorComponent } from './product-selector.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule } from '../pagination/pagination.module';



@NgModule({
  declarations: [ProductSelectorComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PaginationModule
  ],
  exports: [ProductSelectorComponent]
})
export class ProductSelectorModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategorySelectComponent } from './product-category-select.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductCategorySelectComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ProductCategorySelectComponent
  ]
})
export class ProductCategorySelectModule { }

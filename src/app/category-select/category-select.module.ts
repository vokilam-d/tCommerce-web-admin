import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorySelectComponent } from './category-select.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CategorySelectComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CategorySelectComponent
  ]
})
export class CategorySelectModule { }

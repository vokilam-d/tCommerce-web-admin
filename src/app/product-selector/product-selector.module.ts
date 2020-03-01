import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSelectorComponent } from './product-selector.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { GridModule } from '../grid/grid.module';


@NgModule({
  declarations: [ProductSelectorComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    GridModule
  ],
  exports: [ProductSelectorComponent]
})
export class ProductSelectorModule { }

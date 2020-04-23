import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemSorterComponent } from './product-item-sorter.component';
import { PreloaderModule } from '../preloader/preloader.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProductItemSorterComponent],
  imports: [
    CommonModule,
    PreloaderModule,
    SharedModule,
    RouterModule
  ],
  exports: [ProductItemSorterComponent]
})
export class ProductItemSorterModule { }

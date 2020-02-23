import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid.component';
import { PaginationModule } from '../pagination/pagination.module';
import { RouterModule } from '@angular/router';
import { PreloaderModule } from '../preloader/preloader.module';


@NgModule({
  declarations: [GridComponent],
  imports: [
    CommonModule,
    RouterModule,
    PreloaderModule,
    PaginationModule
  ],
  exports: [GridComponent]
})
export class GridModule { }

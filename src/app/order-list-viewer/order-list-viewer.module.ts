import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListViewerComponent } from './order-list-viewer.component';
import { GridModule } from '../grid/grid.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    OrderListViewerComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    SharedModule
  ],
  exports: [
    OrderListViewerComponent
  ]
})
export class OrderListViewerModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderViewRoutingModule } from './order-view-routing.module';
import { OrderViewComponent } from './order-view.component';


@NgModule({
  declarations: [OrderViewComponent],
  imports: [
    CommonModule,
    OrderViewRoutingModule
  ]
})
export class OrderViewModule { }

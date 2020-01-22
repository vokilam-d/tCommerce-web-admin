import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderViewRoutingModule } from './order-view-routing.module';
import { OrderViewComponent } from './order-view.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [OrderViewComponent],
  imports: [
    CommonModule,
    OrderViewRoutingModule,
    SharedModule
  ]
})
export class OrderViewModule { }

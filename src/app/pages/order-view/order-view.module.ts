import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderViewRoutingModule } from './order-view-routing.module';
import { OrderViewComponent } from './order-view.component';
import { SharedModule } from '../../shared/shared.module';
import { AddressFormModule } from '../../address-form/address-form.module';
import { PreloaderModule } from '../../preloader/preloader.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrderViewComponent],
  imports: [
    CommonModule,
    OrderViewRoutingModule,
    SharedModule,
    AddressFormModule,
    PreloaderModule,
    ReactiveFormsModule
  ]
})
export class OrderViewModule { }

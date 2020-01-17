import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingMethodRoutingModule } from './shipping-method-routing.module';
import { ShippingMethodComponent } from './shipping-method.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [ShippingMethodComponent],
  imports: [
    CommonModule,
    ShippingMethodRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ShippingMethodModule { }

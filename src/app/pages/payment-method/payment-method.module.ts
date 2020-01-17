import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentMethodRoutingModule } from './payment-method-routing.module';
import { PaymentMethodComponent } from './payment-method.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PaymentMethodComponent],
  imports: [
    CommonModule,
    PaymentMethodRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PaymentMethodModule { }

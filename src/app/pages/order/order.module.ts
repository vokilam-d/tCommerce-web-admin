import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerSelectorComponent } from './customer-selector/customer-selector.component';
import { PaginationModule } from '../../pagination/pagination.module';
import { AddressFormModule } from '../../address-form/address-form.module';
import { ShippingMethodSelectorComponent } from './shipping-method-selector/shipping-method-selector.component';
import { PaymentMethodSelectorComponent } from './payment-method-selector/payment-method-selector.component';
import { ProductSelectorModule } from '../../product-selector/product-selector.module';


@NgModule({
  declarations: [OrderComponent, CustomerSelectorComponent, ShippingMethodSelectorComponent, PaymentMethodSelectorComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    PaginationModule,
    ReactiveFormsModule,
    FormsModule,
    AddressFormModule,
    ProductSelectorModule
  ]
})
export class OrderModule { }

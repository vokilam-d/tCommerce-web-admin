import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyComponent } from './currency.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CurrencyComponent],
  imports: [
    CommonModule,
    CurrencyRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CurrencyModule { }

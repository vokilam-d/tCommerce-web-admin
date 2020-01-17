import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShippingMethodComponent } from './shipping-method.component';

const routes: Routes = [{ path: '', component: ShippingMethodComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingMethodRoutingModule { }

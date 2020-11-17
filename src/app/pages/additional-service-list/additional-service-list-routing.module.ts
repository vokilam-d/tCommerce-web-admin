import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdditionalServiceListComponent } from './additional-service-list.component';

const routes: Routes = [{ path: '', component: AdditionalServiceListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdditionalServiceListRoutingModule { }

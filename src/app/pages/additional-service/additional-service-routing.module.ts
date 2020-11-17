import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdditionalServiceComponent } from './additional-service.component';

const routes: Routes = [{ path: '', component: AdditionalServiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdditionalServiceRoutingModule { }

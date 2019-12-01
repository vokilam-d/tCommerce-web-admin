import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttributeListComponent } from './attribute-list.component';

const routes: Routes = [{ path: '', component: AttributeListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributeListRoutingModule { }

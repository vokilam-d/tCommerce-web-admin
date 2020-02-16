import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailsTestComponent } from './emails-test.component';

const routes: Routes = [{ path: '', component: EmailsTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailsTestRoutingModule { }

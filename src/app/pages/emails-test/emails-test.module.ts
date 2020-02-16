import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailsTestRoutingModule } from './emails-test-routing.module';
import { EmailsTestComponent } from './emails-test.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [EmailsTestComponent],
  imports: [
    CommonModule,
    EmailsTestRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class EmailsTestModule { }

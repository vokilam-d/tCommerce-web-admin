import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributeListRoutingModule } from './attribute-list-routing.module';
import { AttributeListComponent } from './attribute-list.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AttributeListRoutingModule
  ],
  declarations: [AttributeListComponent],
})
export class AttributeListModule { }

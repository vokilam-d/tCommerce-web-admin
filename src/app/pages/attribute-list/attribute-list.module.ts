import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributeListRoutingModule } from './attribute-list-routing.module';
import { AttributeListComponent } from './attribute-list.component';
import { AttributeService } from '../../shared/services/attribute.service';


@NgModule({
  declarations: [AttributeListComponent],
  imports: [
    CommonModule,
    AttributeListRoutingModule
  ],
  providers: [
    AttributeService
  ]
})
export class AttributeListModule { }

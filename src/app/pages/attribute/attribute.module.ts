import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributeRoutingModule } from './attribute-routing.module';
import { AttributeComponent } from './attribute.component';
import { AttributeService } from '../../shared/services/attribute.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AttributeComponent],
  imports: [
    CommonModule,
    AttributeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AttributeService
  ]
})
export class AttributeModule { }

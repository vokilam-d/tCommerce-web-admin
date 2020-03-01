import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributeListRoutingModule } from './attribute-list-routing.module';
import { AttributeListComponent } from './attribute-list.component';
import { SharedModule } from '../../shared/shared.module';
import { GridModule } from '../../grid/grid.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AttributeListRoutingModule,
    GridModule
  ],
  declarations: [AttributeListComponent],
})
export class AttributeListModule { }

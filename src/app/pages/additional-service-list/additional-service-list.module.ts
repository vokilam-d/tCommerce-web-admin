import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdditionalServiceListRoutingModule } from './additional-service-list-routing.module';
import { AdditionalServiceListComponent } from './additional-service-list.component';
import { SharedModule } from '../../shared/shared.module';
import { GridModule } from '../../grid/grid.module';


@NgModule({
  declarations: [AdditionalServiceListComponent],
  imports: [
    CommonModule,
    AdditionalServiceListRoutingModule,
    SharedModule,
    GridModule
  ]
})
export class AdditionalServiceListModule { }

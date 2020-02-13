import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingSelectorComponent } from './rating-selector.component';



@NgModule({
  declarations: [RatingSelectorComponent],
  imports: [
    CommonModule
  ],
  exports: [
    RatingSelectorComponent
  ]
})
export class RatingSelectorModule { }

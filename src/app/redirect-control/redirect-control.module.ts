import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectControlComponent } from './redirect-control.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [RedirectControlComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [RedirectControlComponent]
})
export class RedirectControlModule { }

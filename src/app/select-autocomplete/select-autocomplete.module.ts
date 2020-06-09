import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectAutocompleteComponent } from './select-autocomplete.component';
import { SharedModule } from '../shared/shared.module';
import { PreloaderModule } from '../preloader/preloader.module';



@NgModule({
  declarations: [SelectAutocompleteComponent],
  imports: [
    CommonModule,
    SharedModule,
    PreloaderModule
  ],
  exports: [SelectAutocompleteComponent]
})
export class SelectAutocompleteModule { }

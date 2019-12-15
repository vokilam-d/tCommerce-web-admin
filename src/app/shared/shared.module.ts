import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './directives/click-outside/click-outside.directive';
import { SelectComponent } from './components/select/select.component';


@NgModule({
  declarations: [
    ClickOutsideDirective,
    SelectComponent
  ],
  exports: [
    ClickOutsideDirective,
    SelectComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}

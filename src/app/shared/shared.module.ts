import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorySelectComponent } from './components/category-select/category-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './directives/click-outside/click-outside.directive';


@NgModule({
  declarations: [CategorySelectComponent, ClickOutsideDirective],
  exports: [
    CategorySelectComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule {
}

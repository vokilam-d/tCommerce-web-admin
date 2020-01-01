import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './directives/click-outside/click-outside.directive';
import { SelectComponent } from './components/select/select.component';
import { FieldsGroupComponent } from './components/fields-group/fields-group.component';


@NgModule({
  declarations: [
    ClickOutsideDirective,
    SelectComponent,
    FieldsGroupComponent
  ],
  exports: [
    ClickOutsideDirective,
    SelectComponent,
    FieldsGroupComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}

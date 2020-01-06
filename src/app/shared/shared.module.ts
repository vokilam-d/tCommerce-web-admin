import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './directives/click-outside/click-outside.directive';
import { SelectComponent } from './components/select/select.component';
import { FieldsGroupComponent } from './components/fields-group/fields-group.component';
import { AttributeSelectComponent } from './components/attribute-select/attribute-select.component';
import { NgUnsubscribe } from './directives/ng-unsubscribe/ng-unsubscribe.directive';


@NgModule({
  declarations: [
    ClickOutsideDirective,
    SelectComponent,
    FieldsGroupComponent,
    AttributeSelectComponent,
    NgUnsubscribe
  ],
  exports: [
    ClickOutsideDirective,
    SelectComponent,
    FieldsGroupComponent,
    AttributeSelectComponent,
    NgUnsubscribe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
}

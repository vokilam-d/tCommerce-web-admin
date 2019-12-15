import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ISelectOption } from './select-option.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }]
})
export class SelectComponent implements OnInit, ControlValueAccessor {

  activeOption: ISelectOption = this.getEmptyOption();
  private isVisible: boolean = false;
  private isDisabled: boolean = false;

  @Input() hasEmpty: boolean = false;
  @Input() options: ISelectOption[] = [];

  constructor() { }

  ngOnInit() {
  }

  onChange = (_: any) => {};

  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: any): void {
    this.activeOption = this.options.find(option => option.data === value) || this.options[0] || this.getEmptyOption();
    this.onChange(value);
  }

  selectOption(option: ISelectOption) {
    this.activeOption = option;
    this.onChange(option.data);
    this.onTouched();
    this.toggleVisibility(false);
  }

  selectEmptyOption() {
    this.selectOption(this.getEmptyOption());
  }

  toggleVisibility(isVisible: boolean = !this.isVisible) {
    if (this.isDisabled) {
      return;
    }

    this.isVisible = isVisible;
  }

  private getEmptyOption(): ISelectOption {
    return {
      data: undefined
    };
  }
}

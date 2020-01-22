import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ISelectOption } from './select-option.interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgUnsubscribe } from '../../directives/ng-unsubscribe/ng-unsubscribe.directive';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends NgUnsubscribe implements OnInit, ControlValueAccessor {

  activeOption: ISelectOption;
  isVisible: boolean = false;
  isDisabled: boolean = false;
  private value: any;

  @Input() hasEmpty: boolean = false;
  @Input() options: ISelectOption[] = [];
  @Input() initialValue: any;
  @Output() select: EventEmitter<any> = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit() {
    this.activeOption = this.options.find(option => option.data === this.initialValue || this.value)
      || this.options[0]
      || this.getEmptyOption();
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
    this.value = value;
    this.setActiveOption();
    this.onChange(value);
    this.select.emit(value);
  }

  selectOption(option: ISelectOption) {
    this.writeValue(option.data);
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

  setActiveOption() {
    this.activeOption = this.options.find(option => option.data === this.value);
  }

  private getEmptyOption(): ISelectOption {
    return {
      data: undefined
    };
  }
}

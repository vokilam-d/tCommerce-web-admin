import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgUnsubscribe } from '../shared/directives/ng-unsubscribe/ng-unsubscribe.directive';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'redirect-control',
  templateUrl: './redirect-control.component.html',
  styleUrls: ['./redirect-control.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RedirectControlComponent),
    multi: true
  }]
})
export class RedirectControlComponent extends NgUnsubscribe implements OnChanges, OnInit, ControlValueAccessor {

  isVisible: boolean = false;
  redirectControl: FormControl;

  @Input() initialSlug: any;
  @Input() newSlugControl: AbstractControl;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.newSlugControl?.currentValue) {
      this.handleRedirectControl();
      this.handleSlugChange();
    }
  }

  ngOnInit(): void {
  }

  onChange = (_: any) => { };

  onTouched = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.redirectControl.disable() : this.redirectControl.enable();
  }

  writeValue(value: boolean): void {
    this.redirectControl.setValue(value, { emitEvent: false });
  }

  private handleRedirectControl() {
    this.redirectControl = new FormControl(false);
    this.redirectControl.valueChanges
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(makeRedirect => {
        this.onChange(makeRedirect);
        this.onTouched();
      });
  }

  private handleSlugChange() {
    this.setDisabledState(this.newSlugControl.value === this.initialSlug);
    this.newSlugControl.valueChanges
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(newSlug => {
        this.setDisabledState(newSlug === this.initialSlug);
        this.writeValue(newSlug !== this.initialSlug);
      });
  }
}

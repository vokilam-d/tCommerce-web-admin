import { Component, OnInit } from '@angular/core';
import { ShippingMethodService } from '../../shared/services/shipping-method.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShippingMethodDto } from '../../shared/dtos/shipping-method.dto';
import { NotyService } from '../../noty/noty.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shipping-method',
  templateUrl: './shipping-method.component.html',
  styleUrls: ['./shipping-method.component.scss']
})
export class ShippingMethodComponent implements OnInit {

  shippingMethods: ShippingMethodDto[] = [];
  activeMethod: ShippingMethodDto;
  form: FormGroup;

  constructor(private shippingMethodService: ShippingMethodService,
              private notyService: NotyService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.init()
  }

  private init() {
    this.activeMethod = null;
    this.shippingMethodService.fetchAllMethods().subscribe(
      response => {
        this.shippingMethods = response.data;

        if (this.shippingMethods[0]) {
          this.selectMethod(this.shippingMethods[0]);
        }
      }
    );
  }

  selectMethod(shippingMethod: ShippingMethodDto) {
    this.activeMethod = shippingMethod;

    this.form = this.formBuilder.group({
      isEnabled: shippingMethod.isEnabled,
      name: [shippingMethod.name, Validators.required],
      price: shippingMethod.price,
      sortOrder: shippingMethod.sortOrder
    });
  }

  addNewMethod() {
    const newMethod = new ShippingMethodDto();
    this.shippingMethods.push(newMethod);
    this.selectMethod(newMethod);
  }

  saveMethod() {
    if (this.form.invalid) {
      this.validateControls();
      return;
    }

    const dto: ShippingMethodDto = {
      ...this.activeMethod,
      ...this.form.value
    };

    if (dto.id) {
      this.shippingMethodService.updateShippingMethod(dto.id, dto)
        .pipe(this.notyService.attachNoty({ successText: `Способ доставки успешно обновлён` }))
        .subscribe(response => this.init());
    } else {

      this.shippingMethodService.createShippingMethod(dto)
        .pipe(this.notyService.attachNoty({ successText: `Способ доставки успешно создан` }))
        .subscribe(response => this.init());
    }
  }

  deleteMethod() {
    if (!this.activeMethod.id || !confirm(`Вы уверены, что хотите удалить '${this.activeMethod.name}'?`)) {
      return;
    }

    this.shippingMethodService.deleteShippingMethod(this.activeMethod.id)
      .pipe(this.notyService.attachNoty({ successText: `Способ доставки успешно удалён` }))
      .subscribe(response => this.init());
  }

  private validateControls(form: FormGroup | FormArray = this.form) {
    Object.keys(form.controls).forEach(controlName => {
      const control = form.get(controlName);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.validateControls(control);
      }
    });
  }

  isControlInvalid(control: AbstractControl) {
    return !control.valid && control.touched;
  }
}

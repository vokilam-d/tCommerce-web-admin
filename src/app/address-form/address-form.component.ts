import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ShippingAddressDto } from '../shared/dtos/shipping-address.dto';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnChanges {

  addressForm: FormGroup;
  @Input() address: ShippingAddressDto = new ShippingAddressDto();
  @Input() showIsDefault: boolean = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.address && changes.address.currentValue) {
      this.buildAddressForm(changes.address.currentValue);
    }
  }

  private buildAddressForm(address: ShippingAddressDto) {
    this.addressForm = this.formBuilder.group({
      isDefault: [address.isDefault],
      firstName: [address.firstName, Validators.required],
      lastName: [address.lastName, Validators.required],
      phoneNumber: [address.phoneNumber, Validators.required],
      city: [address.city, Validators.required],
      streetName: address.streetName,
      novaposhtaOffice: address.novaposhtaOffice
    });
  }

  private validateControls(form: FormGroup | FormArray) {
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

  checkValidity(): boolean {
    if (this.addressForm.valid) {
      return true;
    } else {
      this.validateControls(this.addressForm);
      return false;
    }
  }

  getValue(): ShippingAddressDto {
    return this.addressForm.value;
  }
}

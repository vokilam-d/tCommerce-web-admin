import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ShipmentAddressDto } from '../shared/dtos/shipment-address.dto';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressTypeEnum } from '../shared/enums/address-type.enum';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnChanges {

  addressForm: FormGroup;
  addressTypes = AddressTypeEnum;

  @Input() address: ShipmentAddressDto = new ShipmentAddressDto();
  @Input() showIsDefault: boolean = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.address && changes.address.currentValue) {
      this.buildAddressForm(changes.address.currentValue);
    }
  }

  private buildAddressForm(address: ShipmentAddressDto) {
    this.addressForm = this.formBuilder.group({
      isDefault: [address.isDefault],
      firstName: [address.firstName, Validators.required],
      lastName: [address.lastName, Validators.required],
      phone: [address.phone, Validators.required],
      addressType: [address.addressType, Validators.required],
      settlement: [address.settlement, Validators.required],
      settlementId: [address.settlementId, Validators.required],
      warehouseId: address.warehouseId,
      warehouse: address.warehouse,
      address: address.address,
      addressId: address.addressId,
      buildingNumber: address.buildingNumber,
      flat: address.flat
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

  getValue(): ShipmentAddressDto {
    return this.addressForm.value;
  }
}

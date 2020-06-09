import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ShipmentAddressDto } from '../shared/dtos/shipment-address.dto';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressTypeEnum } from '../shared/enums/address-type.enum';
import { SettlementDto } from '../shared/dtos/settlement.dto';
import { WarehouseDto } from '../shared/dtos/warehouse.dto';
import { StreetDto } from '../shared/dtos/street.dto';
import { getPropertyOf } from '../shared/helpers/get-property-of.function';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnChanges {

  addressForm: FormGroup;
  addressTypes = AddressTypeEnum;
  get settlementIdControl() { return this.addressForm.get(getPropertyOf<ShipmentAddressDto>('settlementId')); }

  @Input() address: ShipmentAddressDto = new ShipmentAddressDto();
  @Input() showIsDefault: boolean = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.address && changes.address.currentValue) {
      this.buildAddressForm(changes.address.currentValue);
    }
  }

  private buildAddressForm(address: ShipmentAddressDto) {
    const controls: Partial<Record<keyof ShipmentAddressDto, any>> = {
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
    }

    this.addressForm = this.formBuilder.group(controls);
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
      const addressTypeProp: keyof ShipmentAddressDto = 'addressType';
      const warehouseIdProp: keyof ShipmentAddressDto = 'warehouseId';
      const streetIdProp: keyof ShipmentAddressDto = 'addressId';
      const buildingProp: keyof ShipmentAddressDto = 'buildingNumber';

      switch (this.addressForm.get(addressTypeProp).value) {
        case AddressTypeEnum.WAREHOUSE:
          return !!this.addressForm.get(warehouseIdProp).value;
        case AddressTypeEnum.DOORS:
          return !!(this.addressForm.get(streetIdProp).value && this.addressForm.get(buildingProp).value);
      }

    } else {
      this.validateControls(this.addressForm);
      return false;
    }
  }

  getValue(): ShipmentAddressDto {
    return this.addressForm.value;
  }

  onSettlementSelect(settlement: SettlementDto) {
    const settlementIdProp: keyof ShipmentAddressDto = 'settlementId';
    const settlementProp: keyof ShipmentAddressDto = 'settlement';

    this.addressForm.get(settlementIdProp).setValue(settlement.id);
    this.addressForm.get(settlementProp).setValue(settlement.fullName);
  }

  onWarehouseSelect(warehouse: WarehouseDto) {
    const warehouseIdProp: keyof ShipmentAddressDto = 'warehouseId';
    const warehouseProp: keyof ShipmentAddressDto = 'warehouse';

    this.addressForm.get(warehouseIdProp).setValue(warehouse.id);
    this.addressForm.get(warehouseProp).setValue(warehouse.description);
  }

  onStreetSelect(street: StreetDto) {
    const streetIdProp: keyof ShipmentAddressDto = 'addressId';
    const streetProp: keyof ShipmentAddressDto = 'address';

    this.addressForm.get(streetIdProp).setValue(street.id);
    this.addressForm.get(streetProp).setValue(street.name);
  }

  isOptionalControlInvalid(prop: keyof ShipmentAddressDto) {
    const addressTypeProp: keyof ShipmentAddressDto = 'addressType';
    const addressType: AddressTypeEnum = this.addressForm.get(addressTypeProp).value;
    const control = this.addressForm.get(prop);

    switch (prop) {
      case 'warehouse':
        return addressType === AddressTypeEnum.WAREHOUSE && !control.value && control.touched;
      case 'address':
        return addressType === AddressTypeEnum.DOORS && !control.value && control.touched;
      case 'buildingNumber':
        return addressType === AddressTypeEnum.DOORS && !control.value && control.touched;
    }
  }
}

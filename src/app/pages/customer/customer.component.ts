import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/services/customer.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotyService } from '../../noty/noty.service';
import { EPageAction } from '../../shared/enums/category-page-action.enum';
import { CustomerDto } from '../../shared/dtos/customer.dto';
import { CustomerAddressDto } from '../../shared/dtos/customer-address.dto';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  isNewCustomer: boolean;
  customer: CustomerDto;
  infoForm: FormGroup;

  activeAddress: CustomerAddressDto = null;
  addressForm: FormGroup;

  tabsLabels: string[] = ['Информация о покупателе', 'Адреса', 'Заказы', 'Корзина', 'Отзывы о товарах', 'Список желаний'];

  constructor(private customersService: CustomerService,
              private formBuilder: FormBuilder,
              private router: Router,
              private notyService: NotyService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.isNewCustomer = this.route.snapshot.data.action === EPageAction.Add;
    if (this.isNewCustomer) {
      this.customer = new CustomerDto();
      this.buildInfoForm();
    } else {
      this.fetchCustomer();
    }
  }

  save() {
    if (this.infoForm.invalid) {
      this.validateControls(this.infoForm);
      return;
    }

    if (this.isNewCustomer) {
      this.addNewCustomer();
    } else {
      this.updateCustomer();
    }
  }

  delete() {
    if (!confirm(`Вы действительно хотите удалить этого покупателя?`)) {
      return;
    }

    this.customersService.deleteCustomer(this.customer.id)
      .pipe(this.notyService.attachNoty({ successText: 'Покупатель успешно удалён' }))
      .subscribe(
        _ => {
          this.goBack();
        },
        error => console.warn(error)
      );
  }

  private buildInfoForm() {
    this.infoForm = this.formBuilder.group({
      firstName: [this.customer.firstName, Validators.required],
      lastName: [this.customer.lastName, Validators.required],
      email: this.customer.email,
      phoneNumber: this.customer.phoneNumber,
      note: this.customer.note
    });
  }

  private fetchCustomer() {
    const id = this.route.snapshot.paramMap.get('id');
    this.customersService.fetchCustomer(id)
      .pipe(this.notyService.attachNoty())
      .subscribe(
        customer => {
          this.customer = customer;
          this.buildInfoForm();
        },
        error => console.warn(error)
      );
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

  private addNewCustomer() {
    const dto = { ...this.customer, ...this.infoForm.value };

    this.customersService.addNewCustomer(dto)
      .pipe(this.notyService.attachNoty({ successText: 'Покупатель успешно добавлен' }))
      .subscribe(
        customer => {
          this.router.navigate(['admin', 'customer', 'edit', customer.id]);
        },
        error => console.warn(error)
      );
  }

  private updateCustomer() {
    const dto = { ...this.customer, ...this.infoForm.value };

    this.customersService.updateCustomer(this.customer.id, dto)
      .pipe(this.notyService.attachNoty({ successText: 'Покупатель успешно обновлён' }))
      .subscribe(
        customer => {
          this.customer = customer;
          this.buildInfoForm();
        },
        error => console.warn(error)
      );
  }

  goBack() {
    this.router.navigate(['admin', 'customer']);
  }

  setAsDefaultAddress(addressArg: CustomerAddressDto) {
    this.customer.addresses.forEach(addr => addr.isDefault = false);
    addressArg.isDefault = true;
  }

  addAddress() {
    this.activeAddress = new CustomerAddressDto();
    this.buildAddressForm(this.activeAddress);
  }

  editAddress(address: CustomerAddressDto) {
    this.activeAddress = address;
    this.buildAddressForm(this.activeAddress);
  }

  private buildAddressForm(address: CustomerAddressDto) {
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

  onAddressFormSubmit() {
    if (this.addressForm.invalid) {
      this.validateControls(this.addressForm);
      return;
    }

    if (this.addressForm.value.isDefault) {
      this.customer.addresses.forEach(addr => addr.isDefault = false);
    }

    const idx = this.customer.addresses.indexOf(this.activeAddress);
    if (idx === -1) {
      this.customer.addresses.push(this.addressForm.value);
    } else {
      this.customer.addresses[idx] = this.addressForm.value;
    }

    this.closeAndResetAddressForm();
  }

  removeAddress(addressIdx: number) {
    this.customer.addresses.splice(addressIdx, 1);
  }

  closeAndResetAddressForm() {
    this.activeAddress = null;
    this.addressForm = null;
  }
}

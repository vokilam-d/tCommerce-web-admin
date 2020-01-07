import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../shared/services/customer.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotyService } from '../../noty/noty.service';
import { EPageAction } from '../../shared/enums/category-page-action.enum';
import { CustomerDto } from '../../shared/dtos/customer.dto';

@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  isNewCustomer: boolean;
  customer: CustomerDto;
  form: FormGroup;

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
      this.buildForm();
    } else {
      this.fetchCustomer();
    }
  }

  save() {
    if (this.form.invalid) {
      this.validateControls();
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

  private buildForm() {
    // const addressesFormArray = this.formBuilder.array([]);
    //
    // this.customer.addresses.forEach(address => {
    //   const group = this.formBuilder.group({
    //     firstName: [address.firstName, Validators.required],
    //     lastName: [address.lastName, Validators.required],
    //     phoneNumber: '',
    //     city: [address.city, Validators.required],
    //     streetName: '',
    //     novaposhtaOffice: ''
    //   });
    //
    //   addressesFormArray.push(group);
    // });

    this.form = this.formBuilder.group({
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
          this.buildForm();
        },
        error => console.warn(error)
      );
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

  private addNewCustomer() {
    const dto = { ...this.customer, ...this.form.value };

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
    const dto = { ...this.customer, ...this.form.value };

    this.customersService.updateCustomer(this.customer.id, dto)
      .pipe(this.notyService.attachNoty({ successText: 'Покупатель успешно обновлён' }))
      .subscribe(
        customer => {
          this.customer = customer;
          this.buildForm();
        },
        error => console.warn(error)
      );
  }

  goBack() {
    this.router.navigate(['admin', 'customer']);
  }
}

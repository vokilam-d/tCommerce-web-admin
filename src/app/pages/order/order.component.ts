import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderDto } from '../../shared/dtos/order.dto';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../shared/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotyService } from '../../noty/noty.service';
import { EPageAction } from '../../shared/enums/category-page-action.enum';
import { CustomerDto } from '../../shared/dtos/customer.dto';
import { ProductSelectorComponent } from './product-selector/product-selector.component';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  isNewOrder: boolean;
  order: OrderDto;
  customer: CustomerDto;
  form: FormGroup;

  @ViewChild(ProductSelectorComponent) productSelectorCmp: ProductSelectorComponent;

  constructor(private formBuilder: FormBuilder,
              private orderService: OrderService,
              private router: Router,
              private notyService: NotyService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.isNewOrder = this.route.snapshot.data.action === EPageAction.Add;

    if (this.isNewOrder) {
      this.order = new OrderDto();
      this.buildForm();
    } else {
      this.fetchOrder();
    }
  }

  goBack() {
    this.router.navigate(['admin', 'order']);
  }

  save() {
    if (this.form.invalid) {
      this.validateAllControls();
      return;
    }

    if (this.isNewOrder) {
      this.addNewOrder();
    } else {
      this.updateOrder();
    }
  }

  deleteOrder() {
    if (!confirm(`Вы действительно хотите удалить заказ ${this.order.id}?`)) {
      return;
    }

    this.orderService.deleteOrder(this.order.id).subscribe(
      _ => {
        this.goBack();
      },
      error => console.warn(error)
    );
  }

  private buildForm() {
    this.form = this.formBuilder.group({
    });
  }

  private fetchOrder() {
    const id = this.route.snapshot.paramMap.get('id');

    this.orderService.fetchOrder(id).subscribe(
      response => {
        this.order = response.data;
        this.buildForm();
      },
      error => console.warn(error)
    )
  }

  private validateAllControls() {
    Object.keys(this.form.controls).forEach(controlName => {
      const control = this.form.get(controlName);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  isControlInvalid(control: AbstractControl) {
    return !control.valid && control.touched;
  }

  private addNewOrder() {
    const dto = this.form.value;
    this.orderService.addNewOrder(dto).subscribe(
      response => {
        const order = response.data;
        this.router.navigate(['admin', 'order', 'edit', order.id]);
      },
      error => console.warn(error)
    );
  }

  private updateOrder() {
    const dto = {
      ...this.order,
      ...this.form.value
    };

    this.orderService.updateOrder(this.order.id, dto)
      .pipe(this.notyService.attachNoty({ successText: 'Заказ успешно обновлён' }))
      .subscribe(
        response => {
          this.order = response.data;
          this.buildForm();
        },
        error => console.warn(error)
      );
  }

  selectCustomer(customer: CustomerDto) {
    this.customer = customer;
    this.order.customerId = customer.id;
    this.order.customerFirstName = customer.firstName;
    this.order.customerLastName = customer.lastName;
  }

  createNewCustomer() {
    this.selectCustomer(new CustomerDto());
  }

  addProducts() {
    this.productSelectorCmp.showSelector();
  }
}

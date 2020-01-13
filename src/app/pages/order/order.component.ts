import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderDto } from '../../shared/dtos/order.dto';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../shared/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotyService } from '../../noty/noty.service';
import { EPageAction } from '../../shared/enums/category-page-action.enum';
import { CustomerDto } from '../../shared/dtos/customer.dto';
import { ProductSelectorComponent } from './product-selector/product-selector.component';
import { OrderItemDto } from '../../shared/dtos/order-item.dto';
import { ShippingAddressDto } from '../../shared/dtos/shipping-address.dto';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  isNewOrder: boolean;
  isNewCustomer: boolean = false;
  order: OrderDto;
  customer: CustomerDto;
  addressForm: FormGroup;

  get orderItemsCost() { return this.order.items.reduce((acc, item) => acc + item.cost, 0); }
  get orderItemsTotalCost() { return this.order.items.reduce((acc, item) => acc + item.totalCost, 0); }

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
    } else {
      this.fetchOrder();
    }
  }

  private fetchOrder() {
    const id = this.route.snapshot.paramMap.get('id');

    this.orderService.fetchOrder(id).subscribe(
      response => {
        this.order = response.data;
      },
      error => console.warn(error)
    )
  }

  navigateToOrderList() {
    this.router.navigate(['admin', 'order']);
  }

  navigateToOrderView() {
    this.router.navigate(['admin', 'order', 'view', this.order.id]);
  }

  cancelEdit() {
    if (!confirm(`Вы уверены, что хотите отменить этот заказ?`)) {
      return;
    }

    if (this.isNewOrder) {
      this.customer = null;
      this.order = new OrderDto();
    } else {
      this.navigateToOrderView();
    }
  }

  placeOrder() {
    if (this.addressForm.invalid) {
      this.validateAllControls();
      return;
    }

    const dto = {
      ...this.order,
      address: this.addressForm.value
    };

    if (this.isNewOrder) {
      this.addNewOrder(dto);
    } else {
      this.updateOrder(dto);
    }
  }

  private addNewOrder(dto: OrderDto) {
    this.orderService.addNewOrder(dto)
      .pipe(this.notyService.attachNoty({ successText: 'Заказ успешно создан' }))
      .subscribe(
        response => {
          this.order = response.data;
          this.navigateToOrderView();
        },
        error => console.warn(error)
      );
  }

  private updateOrder(dto: OrderDto) {
    this.orderService.updateOrder(this.order.id, dto)
      .pipe(this.notyService.attachNoty({ successText: 'Заказ успешно обновлён' }))
      .subscribe(
        response => {
          this.navigateToOrderView();
        },
        error => console.warn(error)
      );
  }

  selectCustomer(customer: CustomerDto) {
    this.customer = customer;
    this.order.customerId = customer.id;
    this.order.customerFirstName = customer.firstName;
    this.order.customerLastName = customer.lastName;
    this.order.customerEmail = customer.email;
    this.order.customerPhoneNumber = customer.phoneNumber;

    const defaultAddress = this.customer.addresses.find(a => a.isDefault) || this.customer.addresses[0];
    this.buildAddressForm(defaultAddress);
  }

  createNewCustomer() {
    this.isNewCustomer = true;
    this.selectCustomer(new CustomerDto());
  }

  showProductSelector() {
    this.productSelectorCmp.showSelector();
  }

  onProductSelect({ variant, qty }) {
    const found = this.order.items.find(item => item.sku === variant.sku);
    if (found) {
      const qtySum = found.qty + qty;
      if (qtySum > variant.qty) {
        alert(`Не хватает количества товара. Пытаетесь добавить: ${qtySum}. Всего в наличии: ${variant.qty}.`);
        return;
      }

      found.qty += qty;
      this.calcOrderItemCosts(found);

    } else {

      const orderItem = new OrderItemDto();
      orderItem.name = variant.name;
      orderItem.sku = variant.sku;
      orderItem.price = variant.price;
      orderItem.qty = qty;
      orderItem.discountPercent = variant.isDiscountApplicable ? this.customer.discountPercent : 0;
      this.calcOrderItemCosts(orderItem);
      this.order.items.push(orderItem);
    }
  }

  removeOrderItem(index: number) {
    this.order.items.splice(index, 1);
  }

  setOrderItemQty(target: any, orderItem: OrderItemDto) {
    const newValue = target.value;
    if (!newValue) {
      target.value = orderItem.qty;
      return;
    }

    orderItem.qty = newValue;
    this.calcOrderItemCosts(orderItem);
  }

  private calcOrderItemCosts(orderItem: OrderItemDto) {
    orderItem.cost = (orderItem.price * orderItem.qty);
    orderItem.totalCost = orderItem.cost - (orderItem.cost * (orderItem.discountPercent / 100));
  }

  private buildAddressForm(address: ShippingAddressDto) {
    this.addressForm = this.formBuilder.group({
      firstName: [address.firstName, Validators.required],
      lastName: address.lastName,
      phoneNumber: address.phoneNumber,
      city: [address.city, Validators.required],
      streetName: address.streetName,
      novaposhtaOffice: address.novaposhtaOffice
    });
  }

  private validateAllControls() {
    Object.keys(this.addressForm.controls).forEach(controlName => {
      const control = this.addressForm.get(controlName);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  isControlInvalid(control: AbstractControl) {
    return !control.valid && control.touched;
  }



  // deleteOrder() {
  //   if (!confirm(`Вы действительно хотите удалить заказ ${this.order.id}?`)) {
  //     return;
  //   }
  //
  //   this.orderService.deleteOrder(this.order.id).subscribe(
  //     _ => {
  //       this.goBack();
  //     },
  //     error => console.warn(error)
  //   );
  // }

  // save() {
  //   if (this.form.invalid) {
  //     this.validateAllControls();
  //     return;
  //   }
  //
  //   if (this.isNewOrder) {
  //     this.addNewOrder();
  //   } else {
  //     this.updateOrder();
  //   }
  // }

  // private buildForm() {
  //   this.form = this.formBuilder.group({
  //   });
  // }
}

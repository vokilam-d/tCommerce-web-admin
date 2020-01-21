import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderDto } from '../../shared/dtos/order.dto';
import { FormBuilder } from '@angular/forms';
import { OrderService } from '../../shared/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotyService } from '../../noty/noty.service';
import { EPageAction } from '../../shared/enums/category-page-action.enum';
import { CustomerDto } from '../../shared/dtos/customer.dto';
import { ProductSelectorComponent } from './product-selector/product-selector.component';
import { OrderItemDto } from '../../shared/dtos/order-item.dto';
import { ShippingMethodDto } from '../../shared/dtos/shipping-method.dto';
import { PaymentMethodDto } from '../../shared/dtos/payment-method.dto';
import { AddressFormComponent } from '../../address-form/address-form.component';
import { ISelectOption } from '../../shared/components/select/select-option.interface';
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
  private newAddress: ShippingAddressDto = new ShippingAddressDto();

  get orderItemsCost() { return this.order.items.reduce((acc, item) => acc + item.cost, 0); }
  get orderItemsTotalCost() { return this.order.items.reduce((acc, item) => acc + item.totalCost, 0); }
  get orderItemsDiscount() : number { return this.order.items.reduce((acc, item) => acc + item.discountValue, 0); }
  get addressSelectOptions(): ISelectOption[] {
    return [
      { data: this.newAddress, view: 'Создать новый адрес' },
      ...this.customer.addresses.map(address => {
        return {
          data: address,
          view: `${address.lastName} ${address.firstName}, ${address.city}, ${address.novaposhtaOffice}, ${address.streetName}`
        };
      })
    ];
  }
  get isNewAddress(): boolean { return this.order.address === this.newAddress; }

  @ViewChild(ProductSelectorComponent) productSelectorCmp: ProductSelectorComponent;
  @ViewChild(AddressFormComponent) addressFormCmp: AddressFormComponent;

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
    if (!this.order.items.length) {
      this.notyService.showErrorNoty(`Не выбран ни один товар`);
      return;
    }
    if (!this.addressFormCmp.checkValidity()) {
      this.notyService.showErrorNoty(`Ошибка в форме адреса`);
      return;
    }
    if (!this.order.shippingMethodId) {
      this.notyService.showErrorNoty(`Не выбран способ доставки`);
      return;
    }
    if (!this.order.paymentMethodId) {
      this.notyService.showErrorNoty(`Не выбран способ оплаты`);
      return;
    }

    const dto = {
      ...this.order,
      address: this.addressFormCmp.getValue()
    };

    if (this.isNewOrder) {
      this.addNewOrder(dto);
    } else {
      this.editOrder(dto);
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

  private editOrder(dto: OrderDto) {
    this.orderService.editOrder(this.order.id, dto)
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

    this.order.address = this.customer.addresses.find(a => a.isDefault) || this.customer.addresses[0];
  }

  createNewCustomer() {
    this.isNewCustomer = true;
    this.selectCustomer(new CustomerDto());
    this.onAddressSelect(this.newAddress);
  }

  showProductSelector() {
    this.productSelectorCmp.showSelector();
  }

  onProductSelect({ variant, qty }) {
    const found = this.order.items.find(item => item.sku === variant.sku);
    if (found) {
      qty += found.qty;
    }

    this.createOrderItem(variant.sku, qty);
  }

  onOrderItemQtyBlur(target: any, orderItem: OrderItemDto) {
    const newValue = parseInt(target.value);
    if (!newValue) {
      target.value = orderItem.qty;
      return;
    }

    this.createOrderItem(orderItem.sku, newValue);
  }

  createOrderItem(sku: string, qty: number) {
    this.orderService.createOrderItem(sku, qty, this.customer.id)
      .pipe(this.notyService.attachNoty())
      .subscribe(
        response => {
          const foundIdx = this.order.items.findIndex(item => item.sku === sku);
          if (foundIdx === -1) {
            this.order.items.push(response.data);
          } else {
            this.order.items[foundIdx] = response.data;
          }
        }
      );
  }

  removeOrderItem(index: number) {
    this.order.items.splice(index, 1);
  }

  onShippingMethodSelect(shippingMethod: ShippingMethodDto) {
    this.order.shippingMethodId = shippingMethod.id;
    this.order.shippingMethodName = shippingMethod.name;
  }

  onPaymentMethodSelect(paymentMethod: PaymentMethodDto) {
    this.order.paymentMethodId = paymentMethod.id;
    this.order.paymentMethodName = paymentMethod.name;
  }

  onAddressSelect(address: ShippingAddressDto) {
    this.order.address = address;
  }
}

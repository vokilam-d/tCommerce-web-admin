import { Component, OnInit, ViewChild } from '@angular/core';
import { AddOrUpdateOrderDto, OrderDto } from '../../shared/dtos/order.dto';
import { FormBuilder, FormControl } from '@angular/forms';
import { OrderService } from '../../shared/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotyService } from '../../noty/noty.service';
import { EPageAction } from '../../shared/enums/category-page-action.enum';
import { CustomerDto } from '../../shared/dtos/customer.dto';
import { OrderItemDto } from '../../shared/dtos/order-item.dto';
import { PaymentMethodDto } from '../../shared/dtos/payment-method.dto';
import { AddressFormComponent } from '../../address-form/address-form.component';
import { ISelectOption } from '../../shared/components/select/select-option.interface';
import { ShipmentAddressDto } from '../../shared/dtos/shipment-address.dto';
import { CustomerService } from '../../shared/services/customer.service';
import { ProductSelectorComponent } from '../../product-selector/product-selector.component';
import { API_HOST } from '../../shared/constants/constants';
import { HeadService } from '../../shared/services/head.service';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe/ng-unsubscribe.directive';
import { finalize, takeUntil } from 'rxjs/operators';
import { PaymentMethodEnum } from '../../shared/enums/payment-method.enum';
import { ShipmentTypeEnum } from '../../shared/enums/shipment-type.enum';
import { ShipmentPayerEnum } from '../../shared/enums/shipment-payer.enum';
import { ShipmentPaymentMethodEnum } from '../../shared/enums/shipment-payment-method.enum';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends NgUnsubscribe implements OnInit {

  uploadedHost = API_HOST;
  isNewOrder: boolean;
  isReorder: boolean;
  isEditOrder: boolean;
  isNewCustomer: boolean = false;
  isLoading: boolean = false;
  order: OrderDto;
  customer: CustomerDto;
  addressSelectControl: FormControl;
  addressSelectOptions: ISelectOption[] = [];
  private newAddress: ShipmentAddressDto = new ShipmentAddressDto();

  get orderItemsCost() { return this.order.items.reduce((acc, item) => acc + item.cost, 0); }
  get orderItemsTotalCost() { return this.order.items.reduce((acc, item) => acc + this.getOrderItemTotalCost(item), 0); }
  get orderItemsDiscount() : number { return this.order.items.reduce((acc, item) => acc + item.discountValue, 0); }
  get isNewAddress(): boolean { return this.order.shipment.recipient === this.newAddress; }

  @ViewChild(ProductSelectorComponent) productSelectorCmp: ProductSelectorComponent;
  @ViewChild(AddressFormComponent) addressFormCmp: AddressFormComponent;

  constructor(private formBuilder: FormBuilder,
              private orderService: OrderService,
              private customerService: CustomerService,
              private router: Router,
              private headService: HeadService,
              private notyService: NotyService,
              private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.isNewOrder = this.route.snapshot.data.action === EPageAction.Add;
    this.isReorder = this.route.snapshot.data.action === EPageAction.AddBasedOn;
    this.isEditOrder = this.route.snapshot.data.action === EPageAction.Edit;

    if (this.isNewOrder) {
      this.order = new OrderDto();
      this.headService.setTitle(`Новый заказ`);
    } else {
      this.fetchOrder();
    }
  }

  private fetchOrder() {
    const id = this.route.snapshot.paramMap.get('id');

    this.isLoading = true;
    this.orderService.fetchOrder(id)
      .pipe(
        this.notyService.attachNoty(),
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        response => {
          this.setOrder(response.data);

          if (this.isReorder || this.isEditOrder) {
            this.fetchCustomer(this.order.customerId);
          }
          this.headService.setTitle(`Изменить заказ №${this.order.id}`);
        },
        error => console.warn(error)
      )
  }

  private fetchCustomer(customerId: number) {
    this.isLoading = true;
    this.customerService.fetchCustomer(customerId)
      .pipe(
        this.notyService.attachNoty(),
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        response => {
          this.selectCustomer(response.data);
        }
      );
  }

  navigateToOrderList() {
    this.router.navigate(['admin', 'order']);
  }

  navigateToOrderView() {
    this.router.navigate(['admin', 'order', 'view', this.order.id]);
  }

  cancelEdit() {
    if (this.isNewOrder) {
      if (!confirm(`Вы уверены, что хотите отменить этот заказ?`)) {
        return;
      }

      this.customer = null;
      this.isNewCustomer = false;
      this.order = new OrderDto();

    } else {

      if (!confirm(`Вы уверены, что хотите отменить редактирование этого заказа?`)) {
        return;
      }

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
    if (!this.order.paymentMethodId) {
      this.notyService.showErrorNoty(`Не выбран способ оплаты`);
      return;
    }

    const dto: AddOrUpdateOrderDto = {
      ...this.order,
      shipment: {
        ...this.order.shipment,
        recipient: this.addressFormCmp.getValue()
      }
    };


    if (this.isNewOrder || this.isReorder) {
      this.addNewOrder(dto);
    } else if (this.isEditOrder) {
      this.editOrder(dto);
    }
  }

  private addNewOrder(dto: AddOrUpdateOrderDto) {
    this.isLoading = true;
    this.orderService.addNewOrder(dto)
      .pipe(
        this.notyService.attachNoty({ successText: 'Заказ успешно создан' }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        response => {
          this.order = response.data;
          this.navigateToOrderView();
        },
        error => console.warn(error)
      );
  }

  private editOrder(dto: AddOrUpdateOrderDto) {
    this.isLoading = true;
    this.orderService.editOrder(this.order.id, dto)
      .pipe(
        this.notyService.attachNoty({ successText: 'Заказ успешно обновлён' }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        response => {
          this.navigateToOrderView();
        },
        error => console.warn(error)
      );
  }

  selectCustomer(customer: CustomerDto) {
    this.customer = customer;

    if (this.isNewOrder) {
      this.order.customerId = customer.id;
      this.order.customerFirstName = customer.firstName;
      this.order.customerLastName = customer.lastName;
      this.order.customerEmail = customer.email;
      this.order.customerPhoneNumber = customer.phoneNumber;

      this.order.shipment.recipient = this.customer.addresses.find(a => a.isDefault) || this.customer.addresses[0] || this.newAddress;
    }

    this.handleAddressForm();
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
    this.isLoading = true;
    this.orderService.createOrderItem(sku, qty, this.customer.id)
      .pipe(
        this.notyService.attachNoty(),
        finalize(() => this.isLoading = false)
      )
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

  onPaymentMethodSelect(paymentMethod: PaymentMethodDto) {
    this.order.paymentMethodId = paymentMethod.id;
    this.order.paymentMethodClientName = paymentMethod.clientName;
    this.order.paymentMethodAdminName = paymentMethod.adminName;
  }

  private handleAddressForm() {
    this.addressSelectOptions = [
      { data: this.newAddress, view: 'Создать новый адрес' },
      ...this.customer.addresses.map(address => {
        let view = `${address.lastName} ${address.firstName}, ${address.settlement}, ${address.address}`;
        if (address.buildingNumber) {
          view += `${address.buildingNumber}, ${address.flat}`;
        }

        return {
          data: address,
          view
        };
      })
    ];

    this.addressSelectControl = new FormControl(this.order.shipment.recipient);
    this.addressSelectControl.valueChanges
      .pipe( takeUntil(this.ngUnsubscribe) )
      .subscribe(value => this.order.shipment.recipient = value)
  }

  getOrderItemTotalCost(orderItem: OrderItemDto): number {
    return orderItem.cost - orderItem.discountValue;
  }

  private setOrder(orderDto: OrderDto) {
    if (!this.isReorder) {
      this.order = orderDto;
      return;
    }

    this.order = {
      customerEmail: orderDto.customerEmail,
      customerFirstName: orderDto.customerFirstName,
      customerLastName: orderDto.customerLastName,
      customerId: orderDto.customerId,
      customerPhoneNumber: orderDto.customerPhoneNumber,
      items: orderDto.items,
      discountPercent: orderDto.discountPercent,
      discountValue: orderDto.discountValue,
      totalCost: orderDto.totalCost,
      totalItemsCost: orderDto.totalItemsCost,
      paymentType: orderDto.paymentType,
      paymentMethodId: orderDto.paymentMethodId,
      paymentMethodAdminName: orderDto.paymentMethodAdminName,
      paymentMethodClientName: orderDto.paymentMethodClientName,
      shippingMethodName: orderDto.shippingMethodName,
      isCallbackNeeded: orderDto.isCallbackNeeded,
      shipment: {
        senderId: orderDto.shipment.senderId,
        recipient: orderDto.shipment.recipient,
        shipmentType: orderDto.shipment.shipmentType,
        payerType: orderDto.shipment.payerType,
        paymentMethod: orderDto.shipment.paymentMethod
      }
    } as OrderDto;
  }
}

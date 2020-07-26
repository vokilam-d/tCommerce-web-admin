import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { OrderDto } from '../../shared/dtos/order.dto';
import { OrderService } from '../../shared/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotyService } from '../../noty/noty.service';
import { IGridCell, IGridValue } from '../../grid/grid.interface';
import { GridComponent } from '../../grid/grid.component';
import { getPropertyOf } from '../../shared/helpers/get-property-of.function';
import { ShipmentAddressDto } from '../../shared/dtos/shipment-address.dto';
import { Subscription } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { DEFAULT_CURRENCY_CODE } from '../../shared/enums/currency.enum';
import { HeadService } from '../../shared/services/head.service';
import { ShipmentDto } from '../../shared/dtos/shipment.dto';
import { FormControl } from '@angular/forms';
import { NgUnsubscribe } from '../../shared/directives/ng-unsubscribe/ng-unsubscribe.directive';
import { OrderStatusEnum } from '../../shared/enums/order-status.enum';
import { ShipmentStatusEnum } from '../../shared/enums/shipment-status.enum';
import { TRANSLATIONS_MAP } from '../../shared/constants/constants';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent extends NgUnsubscribe implements OnInit, AfterViewInit {

  private fetchAllSub: Subscription;

  orders: OrderDto[] = [];
  itemsTotal: number = 0;
  itemsFiltered: number;
  pagesTotal: number = 1;
  isGridLoading: boolean = false;
  gridLinkUrl: string = 'view';
  gridCells: IGridCell[] = orderGridCells;
  defaultCurrency = DEFAULT_CURRENCY_CODE;
  statusControl = new FormControl();

  @ViewChild(GridComponent) gridCmp: GridComponent;

  constructor(private ordersService: OrderService,
              private route: ActivatedRoute,
              private headService: HeadService,
              private cdr: ChangeDetectorRef,
              private notyService: NotyService,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.headService.setTitle(`Заказы`);
    this.handleStatusControl();
  }

  ngAfterViewInit(): void {
    this.fetchOrders();
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  fetchOrders(gridValue: IGridValue = this.gridCmp.getValue()) {
    if (this.fetchAllSub) { this.fetchAllSub.unsubscribe(); }

    const hasStatusFilter = this.statusControl.value;
    if (hasStatusFilter) {
      const statusProp: keyof OrderDto = 'status';
      const statusToFilter: OrderStatusEnum = OrderStatusEnum.READY_TO_SHIP;
      gridValue.filters.push({ fieldName: statusProp, value: statusToFilter })
    }

    this.isGridLoading = true;
    this.cdr.detectChanges();
    this.fetchAllSub = this.ordersService.fetchOrders(gridValue)
      .pipe(this.notyService.attachNoty(), finalize(() => this.isGridLoading = false))
      .subscribe(
        response => {
          this.orders = response.data;
          this.itemsTotal = response.itemsTotal;
          this.itemsFiltered = response.itemsFiltered;
          this.pagesTotal = response.pagesTotal;
        },
        error => console.warn(error)
      );
  }

  hasDifferentName(order: OrderDto): string {
    if (!order.customerFirstName && !order.customerLastName) { return; }
    if (order.customerFirstName === order.shipment.recipient.firstName && order.customerLastName === order.shipment.recipient.lastName) { return; }

    return `${order.customerFirstName} ${order.customerLastName}`;
  }

  private handleStatusControl() {
    this.statusControl.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(_ => this.fetchOrders());
  }
}

const shipmentProp = getPropertyOf<OrderDto>('shipment');
const recipientProp = getPropertyOf<ShipmentDto>('recipient');
const orderGridCells: IGridCell[] = [
  {
    isSearchable: false,
    label: 'ID',
    initialWidth: 40,
    align: 'center',
    isImage: true,
    isSortable: true,
    fieldName: getPropertyOf<OrderDto>('id')
  },
  {
    isSearchable: false,
    label: 'Дата',
    initialWidth: 78,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<OrderDto>('createdAt')
  },
  {
    isSearchable: true,
    label: 'Имя',
    initialWidth: 200,
    align: 'left',
    isImage: false,
    isSortable: false,
    fieldName: `${shipmentProp}.${recipientProp}.${getPropertyOf<ShipmentAddressDto>('lastName')}|${shipmentProp}.${recipientProp}.${getPropertyOf<ShipmentAddressDto>('firstName')}`
  },
  {
    isSearchable: true,
    label: 'Город',
    initialWidth: 100,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: `${shipmentProp}.${recipientProp}.${getPropertyOf<ShipmentAddressDto>('settlement')}`
  },
  {
    isSearchable: true,
    label: 'Отделение',
    initialWidth: 100,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: `${shipmentProp}.${recipientProp}.${getPropertyOf<ShipmentAddressDto>('address')}`
  },
  {
    isSearchable: true,
    label: 'Сумма',
    initialWidth: 75,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<OrderDto>('totalCost')
  },
  {
    isSearchable: false,
    label: 'Статус',
    initialWidth: 130,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<OrderDto>('status'),
    filterFields: Object
      .values(OrderStatusEnum)
      .map(value => ({data: value, view: TRANSLATIONS_MAP[value]}))
  },
  {
    isSearchable: false,
    label: 'Статус посылки',
    initialWidth: 140,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: `${shipmentProp}.${getPropertyOf<ShipmentDto>('status')}`,
    filterFields: Object
      .values(ShipmentStatusEnum)
      .map(value => ({data: value, view: TRANSLATIONS_MAP[value]}))
  },
  {
    isSearchable: true,
    label: 'ТТН',
    initialWidth: 120,
    align: 'left',
    isImage: false,
    isSortable: false,
    fieldName: `${shipmentProp}.${getPropertyOf<ShipmentDto>('trackingNumber')}`
  },
  {
    isSearchable: true,
    label: 'Комментарий админа',
    initialWidth: 150,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<OrderDto>('adminNote')
  },
  {
    isSearchable: false,
    label: 'Оплачено?',
    initialWidth: 75,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<OrderDto>('isOrderPaid')
  },
  {
    isSearchable: true,
    label: 'Способ оплаты',
    initialWidth: 140,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<OrderDto>('paymentMethodAdminName')
  },
  {
    isSearchable: false,
    label: 'Перезванивать?',
    initialWidth: 75,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<OrderDto>('isCallbackNeeded')
  },
  {
    isSearchable: true,
    label: 'Комментарий клиента',
    initialWidth: 100,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<OrderDto>('clientNote')
  }
];

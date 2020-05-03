import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { OrderDto } from '../../shared/dtos/order.dto';
import { OrderService } from '../../shared/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotyService } from '../../noty/noty.service';
import { IGridCell, IGridValue } from '../../grid/grid.interface';
import { GridComponent } from '../../grid/grid.component';
import { getPropertyOf } from '../../shared/helpers/get-property-of.function';
import { ShippingAddressDto } from '../../shared/dtos/shipping-address.dto';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DEFAULT_CURRENCY_CODE } from '../../shared/enums/currency.enum';
import { HeadService } from '../../shared/services/head.service';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, AfterViewInit {

  private fetchAllSub: Subscription;

  orders: OrderDto[] = [];
  itemsTotal: number = 0;
  itemsFiltered: number;
  pagesTotal: number = 1;
  isGridLoading: boolean = false;
  gridLinkUrl: string = 'view';
  gridCells: IGridCell[] = orderGridCells;
  defaultCurrency = DEFAULT_CURRENCY_CODE;

  @ViewChild(GridComponent) gridCmp: GridComponent;

  constructor(private ordersService: OrderService,
              private route: ActivatedRoute,
              private headService: HeadService,
              private cdr: ChangeDetectorRef,
              private notyService: NotyService,
              private router: Router) {
  }

  ngOnInit() {
    this.headService.setTitle(`Заказы`);
  }

  ngAfterViewInit(): void {
    const gridValue = this.gridCmp.getValue();
    this.fetchOrders(gridValue);
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  fetchOrders(gridValue: IGridValue) {
    if (this.fetchAllSub) { this.fetchAllSub.unsubscribe(); }

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
    if (order.customerFirstName === order.address.firstName && order.customerLastName === order.address.lastName) { return; }

    return `${order.customerFirstName} ${order.customerLastName}`;
  }
}

const addressProp = getPropertyOf<OrderDto>('address');
const orderGridCells: IGridCell[] = [
  {
    isSearchable: false,
    label: 'ID',
    initialWidth: 50,
    align: 'center',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<OrderDto>('id')
  },
  {
    isSearchable: false,
    label: 'Дата',
    initialWidth: 100,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<OrderDto>('createdAt'),
    isDisplayBlock: true
  },
  {
    isSearchable: true,
    label: 'Имя',
    initialWidth: 200,
    align: 'left',
    isImage: false,
    isSortable: false,
    fieldName: `${addressProp}.${getPropertyOf<ShippingAddressDto>('lastName')}|${addressProp}.${getPropertyOf<ShippingAddressDto>('firstName')}`
  },
  {
    isSearchable: true,
    label: 'Город',
    initialWidth: 100,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: `${addressProp}.${getPropertyOf<ShippingAddressDto>('city')}`
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
    initialWidth: 65,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<OrderDto>('status')
  },
  {
    isSearchable: true,
    label: 'Комментарий админа',
    initialWidth: 250,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<OrderDto>('adminNote')
  },
  {
    isSearchable: true,
    label: 'ТТН',
    initialWidth: 150,
    align: 'left',
    isImage: false,
    isSortable: false,
    fieldName: getPropertyOf<OrderDto>('novaposhtaTrackingId')
  },
  {
    isSearchable: true,
    label: 'Комментарий клиента',
    initialWidth: 150,
    align: 'left',
    isImage: false,
    isSortable: true,
    fieldName: getPropertyOf<OrderDto>('clientNote')
  }
];

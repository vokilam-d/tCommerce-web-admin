import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild(GridComponent) gridCmp: GridComponent;
  defaultCurrency = DEFAULT_CURRENCY_CODE;

  constructor(private ordersService: OrderService,
              private route: ActivatedRoute,
              private notyService: NotyService,
              private router: Router) {
  }

  ngOnInit() {
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
    this.fetchAllSub = this.ordersService.fetchAllOrders(gridValue)
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
    fieldName: getPropertyOf<OrderDto>('createdAt')
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
    isSearchable: false,
    label: 'Комментарий админа',
    initialWidth: 300,
    align: 'left',
    isImage: false,
    isSortable: false,
    fieldName: getPropertyOf<OrderDto>('adminNote')
  },
  {
    isSearchable: false,
    label: 'Комментарий клиента',
    initialWidth: 150,
    align: 'left',
    isImage: false,
    isSortable: false,
    fieldName: getPropertyOf<OrderDto>('clientNote')
  }
];

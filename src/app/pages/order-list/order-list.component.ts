import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OrderDto } from '../../shared/dtos/order.dto';
import { PaginationComponent } from '../../pagination/pagination.component';
import { OrderService } from '../../shared/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotyService } from '../../noty/noty.service';
import { IPagination } from '../../pagination/pagination.interface';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, AfterViewInit {

  orders: OrderDto[] = [];
  itemsTotal: number = 0;
  pagesTotal: number = 1;

  @ViewChild(PaginationComponent) paginationCmp: PaginationComponent;

  constructor(private ordersService: OrderService,
              private route: ActivatedRoute,
              private notyService: NotyService,
              private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const pagination = this.paginationCmp.getValue();
    this.fetchOrders(pagination);
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  fetchOrders(pagination: IPagination) {
    this.ordersService.fetchAllOrders(pagination)
      .pipe(this.notyService.attachNoty())
      .subscribe(
        response => {
          this.orders = response.data;
          this.itemsTotal = response.itemsTotal;
          this.pagesTotal = response.pagesTotal;
        },
        error => console.warn(error)
      );
  }

}

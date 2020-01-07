import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CustomerDto } from '../../shared/dtos/customer.dto';
import { PaginationComponent } from '../../pagination/pagination.component';
import { CustomerService } from '../../shared/services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotyService } from '../../noty/noty.service';
import { IPagination } from '../../pagination/pagination.interface';


@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, AfterViewInit {

  customers: CustomerDto[] = [];
  itemsTotal: number = 0;
  pagesTotal: number = 1;

  @ViewChild(PaginationComponent) paginationCmp: PaginationComponent;

  constructor(private customersService: CustomerService,
              private route: ActivatedRoute,
              private notyService: NotyService,
              private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const pagination = this.paginationCmp.getValue();
    this.fetchCustomers(pagination);
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  fetchCustomers(pagination: IPagination) {
    this.customersService.fetchAllCustomers(pagination)
      .pipe(this.notyService.attachNoty())
      .subscribe(
        response => {
          this.customers = response.data;
          this.itemsTotal = response.itemsTotal;
          this.pagesTotal = response.pagesTotal;
        },
        error => console.warn(error)
      );
  }
}

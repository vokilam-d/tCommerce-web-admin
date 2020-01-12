import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CustomerDto } from '../../../shared/dtos/customer.dto';
import { CustomerService } from '../../../shared/services/customer.service';
import { PaginationComponent } from '../../../pagination/pagination.component';
import { IPagination } from '../../../pagination/pagination.interface';

@Component({
  selector: 'customer-selector',
  templateUrl: './customer-selector.component.html',
  styleUrls: ['./customer-selector.component.scss']
})
export class CustomerSelectorComponent implements OnInit, AfterViewInit {

  customers: CustomerDto[] = [];
  itemsTotal: number = 0;
  pagesTotal: number = 1;

  @ViewChild(PaginationComponent) paginationCmp: PaginationComponent;
  @Output('selected') selectedEmitter: EventEmitter<CustomerDto> = new EventEmitter();

  constructor(private customerService: CustomerService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const pagination = this.paginationCmp.getValue();
    this.fetchCustomers(pagination);
  }

  fetchCustomers(pagination: IPagination) {
    this.customerService.fetchAllCustomers(pagination)
      .subscribe(
        response => {
          this.customers = response.data;
          this.itemsTotal = response.itemsTotal;
          this.pagesTotal = response.pagesTotal;
        }
      );
  }

  selectCustomer(customer: CustomerDto) {
    this.selectedEmitter.emit(customer);
  }
}

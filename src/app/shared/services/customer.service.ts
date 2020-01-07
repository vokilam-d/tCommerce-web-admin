import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPagination } from '../../pagination/pagination.interface';
import { Observable } from 'rxjs';
import { ResponsePaginationDto } from '../dtos/response.dto';
import { AddOrUpdateCustomerDto, CustomerDto } from '../dtos/customer.dto';
import { toHttpParams } from '../helpers/to-http-params.function';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  fetchAllCustomers(filter: IPagination): Observable<ResponsePaginationDto<CustomerDto[]>> {
    return this.http.get<ResponsePaginationDto<CustomerDto[]>>(
      'http://localhost:3500/api/v1/admin/customers',
      { params: toHttpParams(filter) }
    );
  }

  fetchCustomer(id: string | number): Observable<CustomerDto> {
    return this.http.get<CustomerDto>(`http://localhost:3500/api/v1/admin/customers/${id}`);
  }

  addNewCustomer(dto: AddOrUpdateCustomerDto): Observable<CustomerDto> {
    return this.http.post<CustomerDto>(`http://localhost:3500/api/v1/admin/customers`, dto);
  }

  updateCustomer(id: number, dto: AddOrUpdateCustomerDto): Observable<CustomerDto> {
    return this.http.put<CustomerDto>(`http://localhost:3500/api/v1/admin/customers/${id}`, dto);
  }

  deleteCustomer(id: number) {
    return this.http.delete<any>(`http://localhost:3500/api/v1/admin/customers/${id}`);
  }
}

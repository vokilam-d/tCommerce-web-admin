import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPagination } from '../../pagination/pagination.interface';
import { Observable } from 'rxjs';
import { ResponseDto, ResponsePaginationDto } from '../dtos/response.dto';
import { AddOrUpdateOrderDto, OrderDto } from '../dtos/order.dto';
import { toHttpParams } from '../helpers/to-http-params.function';
import { OrderItemDto } from '../dtos/order-item.dto';
import { CreateOrderItemDto } from '../dtos/create-order-item.dto';
import { ShippingAddressDto } from '../dtos/shipping-address.dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  fetchAllOrders(filter: IPagination): Observable<ResponsePaginationDto<OrderDto[]>> {
    return this.http.get<ResponsePaginationDto<OrderDto[]>>(
      'http://localhost:3500/api/v1/admin/orders',
      { params: toHttpParams(filter) }
    );
  }

  fetchOrder(id: string | number): Observable<ResponseDto<OrderDto>> {
    return this.http.get<ResponseDto<OrderDto>>(`http://localhost:3500/api/v1/admin/orders/${id}`);
  }

  addNewOrder(dto: AddOrUpdateOrderDto): Observable<ResponseDto<OrderDto>> {
    return this.http.post<ResponseDto<OrderDto>>(`http://localhost:3500/api/v1/admin/orders`, dto);
  }

  editOrder(id: number, dto: AddOrUpdateOrderDto): Observable<ResponseDto<OrderDto>> {
    return this.http.put<ResponseDto<OrderDto>>(`http://localhost:3500/api/v1/admin/orders/${id}`, dto);
  }

  updateOrderAddress(id: number, address: ShippingAddressDto) {
    return this.http.put<ResponseDto<OrderDto>>(`http://localhost:3500/api/v1/admin/orders/${id}/address`, address);
  }

  createOrderItem(sku: string, qty: number, customerId?: number) {
    const payload: CreateOrderItemDto = {
      sku,
      qty,
      customerId
    };

    return this.http.post<ResponseDto<OrderItemDto>>(`http://localhost:3500/api/v1/admin/order-items`, payload);
  }

  cancelOrder(id: number) {
    return this.http.post<ResponseDto<OrderDto>>(`http://localhost:3500/api/v1/admin/orders/${id}/actions/cancel`, {});
  }

  startOrder(id: number) {
    return this.http.post<ResponseDto<OrderDto>>(`http://localhost:3500/api/v1/admin/orders/${id}/actions/start`, {});
  }

  shipOrder(id: number) {
    return this.http.post<ResponseDto<OrderDto>>(`http://localhost:3500/api/v1/admin/orders/${id}/actions/ship`, {});
  }

  getPrintOrderUrl(id: number): string {
    return `http://localhost:3500/api/v1/admin/orders/${id}/invoice`;
  }
}

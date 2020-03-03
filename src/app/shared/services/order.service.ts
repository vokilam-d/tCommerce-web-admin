import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto';
import { AddOrUpdateOrderDto, OrderDto } from '../dtos/order.dto';
import { toHttpParams } from '../helpers/to-http-params.function';
import { OrderItemDto } from '../dtos/order-item.dto';
import { CreateOrderItemDto } from '../dtos/create-order-item.dto';
import { ShippingAddressDto } from '../dtos/shipping-address.dto';
import { IGridValue } from '../../grid/grid.interface';
import { getPropertyOf } from '../helpers/get-property-of.function';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  fetchOrders(filter: IGridValue, customerId?: number): Observable<ResponseDto<OrderDto[]>> {
    const customerIdProp = getPropertyOf<OrderDto>('customerId');
    const params = toHttpParams({
      ...filter,
      ...(customerId ? { [customerIdProp]: customerId } : {})
    });

    return this.http.get<ResponseDto<OrderDto[]>>(
      'http://localhost:3500/api/v1/admin/orders',
      { params }
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

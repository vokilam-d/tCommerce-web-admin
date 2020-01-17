import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShippingMethodDto } from '../dtos/shipping-method.dto';
import { ResponseDto } from '../dtos/response.dto';

@Injectable({
  providedIn: 'root'
})
export class ShippingMethodService {

  constructor(private http: HttpClient) { }

  fetchAllMethods() {
    return this.http.get<ResponseDto<ShippingMethodDto[]>>(`http://localhost:3500/api/v1/admin/shipping-method`);
  }

  createShippingMethod(methodDto: ShippingMethodDto) {
    return this.http.post<ResponseDto<ShippingMethodDto>>(`http://localhost:3500/api/v1/admin/shipping-method`, methodDto);
  }

  updateShippingMethod(methodId: string, methodDto: ShippingMethodDto) {
    return this.http.put<ResponseDto<ShippingMethodDto>>(`http://localhost:3500/api/v1/admin/shipping-method/${methodId}`, methodDto);
  }

  deleteShippingMethod(methodId: string) {
    return this.http.delete<ResponseDto<ShippingMethodDto>>(`http://localhost:3500/api/v1/admin/shipping-method/${methodId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentMethodDto } from '../dtos/payment-method.dto';
import { ResponseDto } from '../dtos/response.dto';
import { API_HOST } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  constructor(private http: HttpClient) { }

  fetchAllMethods() {
    return this.http.get<ResponseDto<PaymentMethodDto[]>>(`${API_HOST}/api/v1/admin/payment-method`);
  }

  createPaymentMethod(methodDto: PaymentMethodDto) {
    return this.http.post<ResponseDto<PaymentMethodDto>>(`${API_HOST}/api/v1/admin/payment-method`, methodDto);
  }

  updatePaymentMethod(methodId: string, methodDto: PaymentMethodDto) {
    return this.http.put<ResponseDto<PaymentMethodDto>>(`${API_HOST}/api/v1/admin/payment-method/${methodId}`, methodDto);
  }

  deletePaymentMethod(methodId: string) {
    return this.http.delete<ResponseDto<PaymentMethodDto>>(`${API_HOST}/api/v1/admin/payment-method/${methodId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../dtos/response.dto';
import { API_HOST } from '../constants/constants';
import { OrderChartDataDto } from '../dtos/order-chart-data.dto';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  getOrdersChart() {
    return this.http.get<ResponseDto<OrderChartDataDto[]>>(`${API_HOST}/api/v1/admin/charts/orders`);
  }
}

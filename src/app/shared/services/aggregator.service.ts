import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPagination } from '../../pagination/pagination.interface';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto';
import { toHttpParams } from '../helpers/to-http-params.function';
import { API_HOST } from '../constants/constants';
import { AggregatorDto } from '../dtos/aggregator.dto';

@Injectable({
  providedIn: 'root'
})
export class AggregatorService {

  constructor(private http: HttpClient) {
  }

  fetchAllAggregators(filter: IPagination): Observable<ResponseDto<AggregatorDto[]>> {
    return this.http.get<ResponseDto<AggregatorDto[]>>(
      `${API_HOST}/api/v1/admin/aggregators`,
      { params: toHttpParams(filter) }
    );
  }

  fetchAggregator(id: number): Observable<ResponseDto<AggregatorDto>> {
    return this.http.get<ResponseDto<AggregatorDto>>(`${API_HOST}/api/v1/admin/aggregators/${id}`);
  }

  addNewAggregator(dto: AggregatorDto): Observable<ResponseDto<AggregatorDto>> {
    return this.http.post<ResponseDto<AggregatorDto>>(`${API_HOST}/api/v1/admin/aggregators`, dto);
  }

  updateAggregator(id: number, dto: AggregatorDto): Observable<ResponseDto<AggregatorDto>> {
    return this.http.put<ResponseDto<AggregatorDto>>(`${API_HOST}/api/v1/admin/aggregators/${id}`, dto);
  }

  deleteAggregator(id: number) {
    return this.http.delete<any>(`${API_HOST}/api/v1/admin/aggregators/${id}`);
  }
}

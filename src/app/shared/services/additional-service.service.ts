import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPagination } from '../../pagination/pagination.interface';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto';
import { toHttpParams } from '../helpers/to-http-params.function';
import { API_HOST } from '../constants/constants';
import { AdditionalServiceDto } from '../dtos/additional-service.dto';

@Injectable({
  providedIn: 'root'
})
export class AdditionalServiceService {

  constructor(private http: HttpClient) {
  }

  fetchAllAdditionalServices(filter: IPagination): Observable<ResponseDto<AdditionalServiceDto[]>> {
    return this.http.get<ResponseDto<AdditionalServiceDto[]>>(
      `${API_HOST}/api/v1/admin/additional-services`,
      { params: toHttpParams(filter) }
    );
  }

  fetchAdditionalService(id: number): Observable<ResponseDto<AdditionalServiceDto>> {
    return this.http.get<ResponseDto<AdditionalServiceDto>>(`${API_HOST}/api/v1/admin/additional-services/${id}`);
  }

  addNewAdditionalService(dto: AdditionalServiceDto): Observable<ResponseDto<AdditionalServiceDto>> {
    return this.http.post<ResponseDto<AdditionalServiceDto>>(`${API_HOST}/api/v1/admin/additional-services`, dto);
  }

  updateAdditionalService(id: number, dto: AdditionalServiceDto): Observable<ResponseDto<AdditionalServiceDto>> {
    return this.http.put<ResponseDto<AdditionalServiceDto>>(`${API_HOST}/api/v1/admin/additional-services/${id}`, dto);
  }

  deleteAdditionalService(id: number) {
    return this.http.delete<any>(`${API_HOST}/api/v1/admin/additional-services/${id}`);
  }
}
